// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "./IConsumer.sol";

interface IStonksly {
    function createSToken(
        string memory _name,
        string memory _symbol,
        string memory _assetSymbol
    ) external;

    function initPurchase(address _sToken) external payable;

    function finalizePurchase(uint256 _requestId, uint256 _assetPrice) external;

    function revertPurchase(uint256 _requestId) external;

    function initSale(address _sToken, uint256 _amount) external;

    function finalizeSale(uint256 _requestId, uint256 _assetPrice) external;

    function revertSale(uint256 _requestId) external;

    function emergencyRefund(uint256 _requestId) external;

    function setPurchaseConsumer(IConsumer _purchaseConsumer) external;

    function setSaleConsumer(IConsumer _saleConsumer) external;

    function withdrawFees() external;

    function addLiquidity() external payable;

    function removeLiquidity(uint256 _amount) external;

    function getSTokens() external view returns (address[] memory);
}
