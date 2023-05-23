// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "./Consumer.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "./SToken.sol";

error Stonksly__NotAllowedCall(address who);
error Stonksly__TransferFailed(address account, uint256 amount);
error Stonksly_RequestAlreadyProcessed(uint256 id);
error Stonksly_ConsumerAlreadySet();
error Stonksly__NotEnoughtLiquidityProvided();

contract Stonksly is Ownable {
    enum RequestType {
        PURCHASE,
        SALE
    }

    enum RequestStatus {
        PENDING,
        COMPLETED,
        REFUNDED
    }

    struct Request {
        RequestType requestType;
        RequestStatus status;
        address account;
        address sToken;
        uint256 amount;
        uint256 id;
    }

    address s_stonkslyWallet;
    Consumer s_purchaseConsumer;
    Consumer s_saleConsumer;
    AggregatorV3Interface immutable s_priceFeed;

    uint256 s_collectedFees;
    uint256 s_idCounter;

    mapping(address => bool) s_sTokens;
    mapping(uint256 => Request) s_requests;
    mapping(address => uint256) s_liquidityProviders;

    event STokenCreated(
        address token,
        string name,
        string symbol,
        string assetSymol
    );

    event RequestCreated(
        uint256 id,
        RequestType requestType,
        address accout,
        address sToken,
        uint256 payment
    );

    event RequestCompleted(
        uint256 id,
        RequestType requestType,
        address account,
        address sToken,
        uint256 sTokenAmount,
        uint256 maticAmount
    );

    event PurchaseRefunded(uint256 id, address account, uint256 amount);

    event SaleCompleted(
        uint256 id,
        address account,
        address sToken,
        uint256 sTokenAmount,
        uint256 maticAmount
    );

    event SaleRefunded(
        uint256 id,
        address account,
        address sToken,
        uint256 amount
    );

    constructor(address _stonkslyWallet, AggregatorV3Interface _priceFeed) {
        s_stonkslyWallet = _stonkslyWallet;
        s_priceFeed = _priceFeed;
    }

    modifier onlyAllowed(address _who) {
        if (msg.sender != address(_who)) {
            revert Stonksly__NotAllowedCall(msg.sender);
        }
        _;
    }

    function createSToken(
        string memory _name,
        string memory _symbol,
        string memory _assetSymbol
    ) external onlyOwner {
        address sToken = address(new SToken(_name, _symbol, _assetSymbol));
        s_sTokens[sToken] = true;

        emit STokenCreated(sToken, _name, _symbol, _assetSymbol);
    }

    function initPurchase(address _sToken) external payable {
        uint256 id = s_idCounter++;
        Request memory request = Request(
            RequestType.PURCHASE,
            RequestStatus.PENDING,
            msg.sender,
            _sToken,
            msg.value,
            id
        );
        s_requests[id] = request;
        string memory assetSymbol = SToken(_sToken).getAssetSymbol();
        string[] memory args = new string[](1);
        args[0] = assetSymbol;
        s_purchaseConsumer.init(id, args);
        emit RequestCreated(
            id,
            RequestType.PURCHASE,
            msg.sender,
            _sToken,
            msg.value
        );
    }

    function finalizePurchase(
        uint256 _requestId,
        uint256 _assetPrice
    ) external onlyAllowed(address(s_purchaseConsumer)) {
        Request memory request = s_requests[_requestId];

        checkIfPending(request);

        request.status = RequestStatus.COMPLETED;
        s_requests[_requestId] = request;
        (, int price, , , ) = s_priceFeed.latestRoundData();

        // MATIC/USD -> 8 decimals, 18 decimals
        uint256 normalizedMaticPrice = uint256(price) * 1e10;

        //1% fee
        uint256 afterCharge = ((request.amount * 99) / 100);
        s_collectedFees = request.amount - afterCharge;

        uint256 valueInUsd = (afterCharge * normalizedMaticPrice) / 1e18;
        uint256 valueInCents = valueInUsd * 100;

        uint256 normalizedAssetPrice = _assetPrice * 1e18;
        uint256 amount = (valueInCents * 1e18) / normalizedAssetPrice;

        SToken(request.sToken).mint(request.account, amount);

        emit RequestCompleted(
            _requestId,
            RequestType.PURCHASE,
            request.account,
            request.sToken,
            amount,
            request.amount
        );
    }

    function revertPurchase(uint256 _requestId) external {
        Request memory request = s_requests[_requestId];

        checkIfPending(request);

        request.status = RequestStatus.REFUNDED;
        s_requests[_requestId] = request;

        (bool success, ) = request.account.call{value: request.amount}("");

        if (!success) {
            revert Stonksly__TransferFailed(request.account, request.amount);
        }

        emit PurchaseRefunded(_requestId, request.account, request.amount);
    }

    //_sToken needs to be approved first
    function initSale(address _sToken, uint256 _amount) external {
        uint256 id = s_idCounter++;
        Request memory request = Request(
            RequestType.SALE,
            RequestStatus.PENDING,
            msg.sender,
            _sToken,
            _amount,
            id
        );
        s_requests[id] = request;

        SToken(_sToken).transferFrom(msg.sender, address(this), _amount);

        string memory assetSymbol = SToken(_sToken).getAssetSymbol();
        string[] memory args = new string[](1);
        args[0] = assetSymbol;
        s_saleConsumer.init(id, args);
        emit RequestCreated(id, RequestType.SALE, msg.sender, _sToken, _amount);
    }

    function finalizeSale(
        uint256 _requestId,
        uint256 _assetPrice
    ) external onlyAllowed(address(s_saleConsumer)) {
        Request memory request = s_requests[_requestId];

        checkIfPending(request);

        request.status = RequestStatus.COMPLETED;
        s_requests[_requestId] = request;
        (, int price, , , ) = s_priceFeed.latestRoundData();

        uint256 normalizedMaticPriceInUsd = uint256(price) * 1e10;
        uint256 maticPriceInCents = normalizedMaticPriceInUsd * 100;
        uint normalizedAssetPrice = _assetPrice * 1e18;

        uint256 sTokensValueInCents = (normalizedAssetPrice * request.amount) /
            1e18;

        uint256 maticToWitdhraw = (sTokensValueInCents * 1e18) /
            maticPriceInCents;

        (bool success, ) = request.account.call{value: maticToWitdhraw}("");

        if (!success) {
            revert Stonksly__TransferFailed(request.account, maticToWitdhraw);
        }

        emit RequestCompleted(
            _requestId,
            RequestType.SALE,
            request.account,
            request.sToken,
            request.amount,
            maticToWitdhraw
        );
    }

    function revertSale(uint256 _requestId) external {
        Request memory request = s_requests[_requestId];

        checkIfPending(request);

        request.status = RequestStatus.REFUNDED;
        s_requests[_requestId] = request;

        bool success = SToken(request.sToken).transfer(
            request.account,
            request.amount
        );

        if (!success) {
            revert Stonksly__TransferFailed(request.account, request.amount);
        }

        emit SaleRefunded(
            _requestId,
            request.account,
            request.sToken,
            request.amount
        );
    }

    function emergencyRefund(uint256 _requestId) external {
        Request memory request = s_requests[_requestId];

        checkIfPending(request);

        request.status = RequestStatus.REFUNDED;
        s_requests[_requestId] = request;

        if (request.requestType == RequestType.PURCHASE) {
            (bool success, ) = request.account.call{value: request.amount}("");
            if (!success) {
                revert Stonksly__TransferFailed(msg.sender, request.amount);
            }

            emit PurchaseRefunded(_requestId, request.account, request.amount);
        } else {
            bool success = SToken(request.sToken).transfer(
                request.account,
                request.amount
            );

            if (!success) {
                revert Stonksly__TransferFailed(
                    request.account,
                    request.amount
                );
            }
            emit SaleRefunded(
                _requestId,
                request.account,
                request.sToken,
                request.amount
            );
        }
    }

    function setPurchaseConsumer(Consumer _purchaseConsumer) external {
        if (address(s_purchaseConsumer) != address(0)) {
            revert Stonksly_ConsumerAlreadySet();
        }
        s_purchaseConsumer = _purchaseConsumer;
    }

    function setSaleConsumer(Consumer _saleConsumer) external {
        if (address(s_saleConsumer) != address(0)) {
            revert Stonksly_ConsumerAlreadySet();
        }
        s_saleConsumer = _saleConsumer;
    }

    function withdraw() external onlyAllowed(s_stonkslyWallet) {
        uint256 toWithdraw = s_collectedFees;
        s_collectedFees = 0;
        (bool success, ) = s_stonkslyWallet.call{value: toWithdraw}("");

        if (!success) {
            revert Stonksly__TransferFailed(msg.sender, toWithdraw);
        }
    }

    //To provide additional MATIC liquidity - can be rewarded in future
    function addLiquidity() public payable {
        s_liquidityProviders[msg.sender] += msg.value;
    }

    function removeLiquidity(uint256 _amount) external {
        if (s_liquidityProviders[msg.sender] < _amount) {
            revert Stonksly__NotEnoughtLiquidityProvided();
        }
        s_liquidityProviders[msg.sender] -= _amount;
        (bool success, ) = msg.sender.call{value: _amount}("");
        if (!success) {
            revert Stonksly__TransferFailed(msg.sender, _amount);
        }
    }

    receive() external payable {
        addLiquidity();
    }

    function prepareArgs(
        address _sToken
    ) private view returns (string[] memory args) {
        string memory assetSymbol = SToken(_sToken).getAssetSymbol();
        args[0] = assetSymbol;
        return args;
    }

    function checkIfPending(Request memory _request) private {
        if (_request.status != RequestStatus.PENDING) {
            revert Stonksly_RequestAlreadyProcessed(_request.id);
        }
    }

    //To delete
    function withdrawAll() external {
        s_stonkslyWallet.call{value: address(this).balance}("");
    }
}
