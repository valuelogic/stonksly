// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "./IConsumer.sol";

interface IStonksly {
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

    function createSToken(
        string memory _name,
        string memory _symbol,
        string memory _assetSymbol
    ) external;

    function initPurchase(address _sToken) external payable;

    function finalizePurchase(uint256 _requestId, uint256 _assetPrice) external;

    function undoPurchase(uint256 _requestId) external;

    function initSale(address _sToken, uint256 _amount) external;

    function finalizeSale(uint256 _requestId, uint256 _assetPrice) external;

    function undoSale(uint256 _requestId) external;

    function emergencyRefund(uint256 _requestId) external;

    function setPurchaseConsumer(IConsumer _purchaseConsumer) external;

    function setSaleConsumer(IConsumer _saleConsumer) external;

    function withdrawFees() external;

    function addLiquidity() external payable;

    function removeLiquidity(uint256 _amount) external;

    function getPurchaseConsumer() external view returns (address);

    function getSaleConsumer() external view returns (address);

    function getCollectedFees() external view returns (uint256);

    function isPurchasable(address _sToken) external view returns (bool);

    function getRequest(uint256 _id) external view returns (Request memory);

    function getLiquidity(address _provider) external view returns (uint256);
}
