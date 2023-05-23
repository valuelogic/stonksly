pragma solidity 0.8.19;
// SPDX-License-Identifier: MIT

import "./Consumer.sol";

contract PurchaseConsumer is Consumer {
    constructor(
        Stonksly _stonksly,
        uint64 _subscriptionId,
        string memory _requestSource,
        address _oracle
    ) Consumer(_stonksly, _subscriptionId, _requestSource, _oracle) {}

    function fulfillRequest(
        bytes32 requestId,
        bytes memory response,
        bytes memory err
    ) internal override {
        if (err.length > 0) {
            i_stonksly.revertPurchase(s_requests[requestId]);
        } else {
            uint256 price = uint256(bytes32(response));
            i_stonksly.finalizePurchase(s_requests[requestId], price);
        }
    }
}
