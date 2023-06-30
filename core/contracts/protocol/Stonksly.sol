// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "./IConsumer.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "./STokenManager.sol";
import "./IStonksly.sol";

error Stonksly__NotAllowedCall(address who);
error Stonksly__TransferFailed(address account, uint256 amount);
error Stonksly__RewardTransferFailed(address account, uint256 amount);
error Stonksly_RequestIsNotPending(uint256 id);
error Stonksly_ConsumerAlreadySet();
error Stonksly__NotEnoughtLiquidityProvided();
error Stonksly__STokenNotRegistered(address sToken);
error Stonksly__RequestNotExists(uint256 requestId);
error Stonksly__NotTheRequestOwner(address who, address requestOwner);
error Stonksly__InvestmentRequired();

contract Stonksly is IStonksly, Ownable {
    address immutable s_stonkslyWallet;
    AggregatorV3Interface immutable s_priceFeed;
    STokenManager immutable s_sTokenManager;
    address payable immutable s_stonkslyToken;

    IConsumer private s_purchaseConsumer;
    IConsumer private s_saleConsumer;

    uint256 private s_collectedFees;
    uint256 private s_idCounter;

    address[] private s_sTokensAddresses;

    uint256 private duration;
    uint256 private finishAt;
    uint256 private updatedAt;
    uint256 private rewardRate;
    uint256 private rewardPerTokenStored;
    mapping(address => uint256) private userRewardPerTokenPaid;
    mapping(address => uint256) private rewards;
    uint256 private totalSupply;

    mapping(address => bool) private s_sTokens;
    mapping(uint256 => Request) private s_requests;
    mapping(address => uint256) private s_liquidityProviders;

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
    event LiquidityRemoved(address who, uint256 amount);

    event FeesCollected(uint256 amount);

    constructor(
        address _stonkslyWallet,
        AggregatorV3Interface _priceFeed,
        STokenManager _sTokenManager,
        address payable _stonkslyToken
    ) {
        s_stonkslyWallet = _stonkslyWallet;
        s_priceFeed = _priceFeed;
        s_sTokenManager = _sTokenManager;
        s_stonkslyToken = _stonkslyToken;
    }

    modifier updateReward(address _account) {
      rewardPerTokenStored = rewardPerToken();
      updatedAt = lastTimeRewardApplicable();

      if (_account != address(0)) {
        rewards[_account] = earned(_account);
        userRewardPerTokenPaid[_account] = rewardPerTokenStored;
      }

       _;
    }

    function lastTimeRewardApplicable() public view returns (uint) {
        return _min(finishAt, block.timestamp);
    }

    function rewardPerToken() public view returns (uint) {
      if (totalSupply == 0) {
        return rewardPerTokenStored;
      }

      return
        rewardPerTokenStored + (rewardRate * (lastTimeRewardApplicable() - updatedAt) * 1e18) / totalSupply;
    }

    function createSToken(
        string memory _name,
        string memory _symbol,
        string memory _assetSymbol
    ) external onlyOwner {
        address sToken = s_sTokenManager.deploySToken(
            _name,
            _symbol,
            _assetSymbol
        );
        s_sTokens[sToken] = true;
    }

    function initPurchase(address _sToken) external payable {
        if (msg.value == 0) {
            revert Stonksly__InvestmentRequired();
        }
        checkIfSTokenRegistered(_sToken);
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

    //sprawdzić czy purchase request
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

        //0,1% fee -> 0,05% to provide MATIC liquidity
        uint256 afterCharge = ((request.amount * 999) / 1000);
        s_collectedFees += (request.amount - afterCharge) / 2;

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

    function undoPurchase(uint256 _requestId) external {
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
        if (_amount == 0) {
            revert Stonksly__InvestmentRequired();
        }
        checkIfSTokenRegistered(_sToken);
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

        //0,1% fee -> 0,05% to provide MATIC liquidity
        uint256 maticToWithdraw = (maticAmount * 999) / 1000;
        s_collectedFees += (maticAmount - maticToWithdraw) / 2;

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



    function undoSale(uint256 _requestId) external {
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
        uint256 toWithdraw = s_collectedFees;
        s_collectedFees = 0;
        sendMatic(s_stonkslyWallet, toWithdraw);
        emit FeesCollected(toWithdraw);
    }

    // To provide additional MATIC liquidity - can be rewarded in future
    function addLiquidity() public payable {
        s_liquidityProviders[msg.sender] += msg.value;
        totalSupply += msg.value;
        emit LiquidityProvided(msg.sender, msg.value);
    }

    function removeLiquidity(uint256 _amount) external {
        if (s_liquidityProviders[msg.sender] < _amount) {
            revert Stonksly__NotEnoughtLiquidityProvided();
        }
        s_liquidityProviders[msg.sender] -= _amount;
        totalSupply -= _amount;
        sendMatic(msg.sender, _amount);

        emit LiquidityRemoved(msg.sender, _amount);
    }

    function earned(address _account) public view returns (uint) {
      return
        ((s_liquidityProviders[_account] * (rewardPerToken() - userRewardPerTokenPaid[_account])) / 1e18) + rewards[_account];
    }

    function getReward() private updateReward(msg.sender) {
      uint256 reward = rewards[msg.sender];
        if (reward > 0) {
          rewards[msg.sender] = 0;
        (bool success, ) = msg.sender.call{value: reward}("");
        if (!success) {
            revert Stonksly__RewardTransferFailed(msg.sender, reward);
        }
        }
    }

    function setRewardsDuration(uint256 _duration) private onlyOwner {
        require(finishAt < block.timestamp, "reward duration not finished");
        duration = _duration;
    }

    function notifyRewardAmount(
        uint256 _amount
    ) private onlyOwner updateReward(address(0)) {
        if (block.timestamp >= finishAt) {
            rewardRate = _amount / duration;
        } else {
            uint256 remainingRewards = (finishAt - block.timestamp) * rewardRate;
            rewardRate = (_amount + remainingRewards) / duration;
        }
        
        require(rewardRate > 0, "reward rate = 0");
        require(
            rewardRate * duration <=  IERC20(s_stonkslyToken).balanceOf(address(this)),
            "reward amount > balance"
        );

        finishAt = block.timestamp + duration;
        updatedAt = block.timestamp;
    }

    function _min(uint x, uint y) private pure returns (uint) {
        return x <= y ? x : y;
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

    function getPurchaseConsumer() external view override returns (address) {
        return address(s_purchaseConsumer);
    }

    function getSaleConsumer() external view override returns (address) {
        return address(s_saleConsumer);
    }

    function getCollectedFees() external view override returns (uint256) {
        return s_collectedFees;
    }

    function isPurchasable(
        address _sToken
    ) external view override returns (bool) {
        return s_sTokens[_sToken];
    }

    function getRequest(
        uint256 _id
    ) external view override returns (Request memory) {
        return s_requests[_id];
    }

    function getLiquidity(
        address _provider
    ) external view override returns (uint256) {
        return s_liquidityProviders[_provider];
    }

    receive() external payable {
        addLiquidity();
    }

    function checkIfAllowed(address _who) private view {
        if (msg.sender != address(_who)) {
            revert Stonksly__NotAllowedCall(msg.sender);
        }
    }

    function checkIfSTokenRegistered(address _sToken) private view {
        if (!s_sTokens[_sToken]) {
            revert Stonksly__STokenNotRegistered(_sToken);
        }
    }

    function checkIfPending(Request memory _request) private pure {
        if (_request.status != RequestStatus.PENDING) {
            revert Stonksly_RequestIsNotPending(_request.id);
        }
    }
}
