// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "./Consumer.sol";

contract SaleConsumer is Consumer {
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
            i_stonksly.revertSale(s_requests[requestId]);
        } else {
            uint256 price = uint256(bytes32(response));
            i_stonksly.finalizeSale(s_requests[requestId], price);
        }
    }
}
