// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "./Consumer.sol";

contract PurchaseConsumer is Consumer {
    constructor(
        IStonksly _stonksly,
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
            emit RequestFailed(requestId, err);
        } else {
            uint256 price = uint256(bytes32(response));
            uint256 stonsklyRequestId = s_requests[requestId];
            i_stonksly.finalizePurchase(stonsklyRequestId, price);
            emit ResponseReceived(requestId, stonsklyRequestId, price);
        }
    }
}
