// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "./IStonksly.sol";
import "./IConsumer.sol";
import {Functions, FunctionsClient} from "../functions/FunctionClient.sol";

// error Consumer__SenderNotAllowed(address sender);

abstract contract Consumer is IConsumer, FunctionsClient {
    using Functions for Functions.Request;

    IStonksly immutable i_stonksly;
    uint64 immutable i_subscriptionId;
    string s_requestSource;

    mapping(bytes32 => uint256) internal s_requests;

    event OracleRequestSent(bytes32 oracleRequestId, uint256 stonkslyRequestId);
    event ResponseReceived(
        bytes32 oracleRequestId,
        uint256 stonkslyRequestId,
        uint256 price
    );
    event RequestFailed(bytes32 oracleRequestId, bytes error);

    constructor(
        IStonksly _stonksly,
        uint64 _subscriptionId,
        string memory _requestSource,
        address _oracle
    ) FunctionsClient(_oracle) {
        i_stonksly = _stonksly;
        i_subscriptionId = _subscriptionId;
        s_requestSource = _requestSource;
    }

    function init(
        uint256 _stonkslyRequestId,
        string[] calldata args
    ) external override {
        //Only stonksly can invoke this method
        // if(msg.sender != address(i_stonksly)) {
        //     revert Consumer__SenderNotAllowed(msg.sender);
        // }
        Functions.Request memory req;
        req.initializeRequest(
            Functions.Location.Inline,
            Functions.CodeLanguage.JavaScript,
            s_requestSource
        );
        req.addArgs(args);
        bytes32 requestId = sendRequest(req, i_subscriptionId, 300000);

        s_requests[requestId] = _stonkslyRequestId;

        emit OracleRequestSent(requestId, _stonkslyRequestId);
    }

    function getStonskly() external view returns (address) {
        return address(i_stonksly);
    }

    function getSubscriptionId() external view returns (uint64) {
        return i_subscriptionId;
    }

    function getRequest(bytes32 _requestId) external view returns (uint256) {
        return s_requests[_requestId];
    }
}
