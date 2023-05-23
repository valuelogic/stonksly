// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "./IConsumer.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "./SToken.sol";
import "./IStonksly.sol";

error Stonksly__NotAllowedCall(address who);
error Stonksly__TransferFailed(address account, uint256 amount);
error Stonksly_RequestAlreadyProcessed(uint256 id);
error Stonksly_ConsumerAlreadySet();
error Stonksly__NotEnoughtLiquidityProvided();
error Stonklsy__STokenNotExists(address sToken);
error Stonksly__RequestNotExists(uint256 requestId);
error Stonksly__NotTheRequestOwner(address who, address requestOwner);

contract Stonksly is IStonksly, Ownable {
    enum RequestType {
        PURCHASE,
        SALE
    }

    enum RequestStatus {
        NONE,
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
    IConsumer s_purchaseConsumer;
    IConsumer s_saleConsumer;
    AggregatorV3Interface immutable s_priceFeed;

    uint256 s_collectedFees;
    uint256 s_idCounter;

    address[] s_sTokensAddresses;
    mapping(address => bool) s_sTokens;
    mapping(uint256 => Request) public s_requests;
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

    event RequestRefunded(uint256 id);

    event LiquidityProvided(address who, uint256 amount);
    event LiquidityWithdrawn(address who, uint256 amount);

    constructor(address _stonkslyWallet, AggregatorV3Interface _priceFeed) {
        s_stonkslyWallet = _stonkslyWallet;
        s_priceFeed = _priceFeed;
    }

    function createSToken(
        string memory _name,
        string memory _symbol,
        string memory _assetSymbol
    ) external onlyOwner {
        address sToken = address(new SToken(_name, _symbol, _assetSymbol));
        s_sTokens[sToken] = true;
        s_sTokensAddresses.push(sToken);

        emit STokenCreated(sToken, _name, _symbol, _assetSymbol);
    }

    function initPurchase(address _sToken) external payable {
        checkIfSTokenExists(_sToken);
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
    ) external {
        checkIfAllowed(address(s_purchaseConsumer));
        Request memory request = s_requests[_requestId];

        checkIfPending(request);

        request.status = RequestStatus.COMPLETED;
        s_requests[_requestId] = request;
        (, int price, , , ) = s_priceFeed.latestRoundData();

        // MATIC/USD -> 8 decimals, 18 decimals
        uint256 normalizedMaticPrice = uint256(price) * 1e10;

        //0,1% fee
        uint256 afterCharge = ((request.amount * 99) / 100);
        s_collectedFees += request.amount - afterCharge;

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
        checkIfAllowed(address(s_purchaseConsumer));
        Request memory request = s_requests[_requestId];

        checkIfPending(request);

        request.status = RequestStatus.REFUNDED;
        s_requests[_requestId] = request;

        sendMatic(request.account, request.amount);

        emit RequestRefunded(_requestId);
    }

    //_sToken needs to be approved first
    function initSale(address _sToken, uint256 _amount) external {
        checkIfSTokenExists(_sToken);
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

    function finalizeSale(uint256 _requestId, uint256 _assetPrice) external {
        checkIfAllowed(address(s_saleConsumer));
        Request memory request = s_requests[_requestId];

        checkIfPending(request);

        request.status = RequestStatus.COMPLETED;
        s_requests[_requestId] = request;
        (, int price, , , ) = s_priceFeed.latestRoundData();

        uint256 normalizedMaticPriceInUsd = uint256(price) * 1e10;
        uint256 maticPriceInCents = normalizedMaticPriceInUsd * 100;
        uint normalizedAssetPrice = _assetPrice * 1e18;

        uint256 sTokensValueInCents = (normalizedAssetPrice * request.amount) /
            1e18; // 100000000000000000000

        uint256 maticAmount = (sTokensValueInCents * 1e18) / maticPriceInCents;

        // //0,1% fee
        uint256 maticToWithdraw = (maticAmount * 999) / 1000;
        s_collectedFees += maticAmount - maticToWithdraw;

        SToken(request.sToken).burn(address(this), request.amount);
        sendMatic(request.account, maticToWithdraw);

        emit RequestCompleted(
            _requestId,
            RequestType.SALE,
            request.account,
            request.sToken,
            request.amount,
            maticToWithdraw
        );
    }

    function revertSale(uint256 _requestId) external {
        checkIfAllowed(address(s_saleConsumer));
        Request memory request = s_requests[_requestId];

        checkIfPending(request);

        request.status = RequestStatus.REFUNDED;
        s_requests[_requestId] = request;

        sendSToken(request.sToken, request.account, request.amount);

        emit RequestRefunded(_requestId);
    }

    function emergencyRefund(uint256 _requestId) external {
        Request memory request = s_requests[_requestId];
        if (request.account != msg.sender) {
            revert Stonksly__NotTheRequestOwner(msg.sender, request.account);
        }
        checkIfPending(request);

        request.status = RequestStatus.REFUNDED;
        s_requests[_requestId] = request;

        if (request.requestType == RequestType.PURCHASE) {
            sendMatic(request.account, request.amount);
        } else {
            sendSToken(request.sToken, request.account, request.amount);
        }
        emit RequestRefunded(_requestId);
    }

    function setPurchaseConsumer(IConsumer _purchaseConsumer) external {
        if (address(s_purchaseConsumer) != address(0)) {
            revert Stonksly_ConsumerAlreadySet();
        }
        s_purchaseConsumer = _purchaseConsumer;
    }

    function setSaleConsumer(IConsumer _saleConsumer) external {
        if (address(s_saleConsumer) != address(0)) {
            revert Stonksly_ConsumerAlreadySet();
        }
        s_saleConsumer = _saleConsumer;
    }

    function withdrawFees() external {
        checkIfAllowed(s_stonkslyWallet);
        uint256 toWithdraw = s_collectedFees;
        s_collectedFees = 0;
        sendMatic(s_stonkslyWallet, toWithdraw);
    }

    //To provide additional MATIC liquidity - can be rewarded in future
    function addLiquidity() public payable {
        s_liquidityProviders[msg.sender] += msg.value;
        emit LiquidityProvided(msg.sender, msg.value);
    }

    function removeLiquidity(uint256 _amount) external {
        if (s_liquidityProviders[msg.sender] < _amount) {
            revert Stonksly__NotEnoughtLiquidityProvided();
        }
        s_liquidityProviders[msg.sender] -= _amount;
        sendMatic(msg.sender, _amount);

        emit LiquidityWithdrawn(msg.sender, _amount);
    }

    function sendMatic(address _receiver, uint256 _amount) private {
        (bool success, ) = _receiver.call{value: _amount}("");
        if (!success) {
            revert Stonksly__TransferFailed(_receiver, _amount);
        }
    }

    function sendSToken(
        address _sToken,
        address _receiver,
        uint256 _amount
    ) private {
        bool success = SToken(_sToken).transfer(_receiver, _amount);
        if (!success) {
            revert Stonksly__TransferFailed(_receiver, _amount);
        }
    }

    function getSTokens() external view returns (address[] memory) {
        return s_sTokensAddresses;
    }

    function checkIfAllowed(address _who) private view {
        if (msg.sender != address(_who)) {
            revert Stonksly__NotAllowedCall(msg.sender);
        }
    }

    function checkIfSTokenExists(address _sToken) private view {
        if (!s_sTokens[_sToken]) {
            revert Stonklsy__STokenNotExists(_sToken);
        }
    }

    function checkIfPending(Request memory _request) private pure {
        if (_request.status != RequestStatus.PENDING) {
            revert Stonksly_RequestAlreadyProcessed(_request.id);
        }
    }
}
