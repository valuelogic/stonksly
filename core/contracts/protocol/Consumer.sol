// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "./IStonksly.sol";
import "./IConsumer.sol";
import {Functions, FunctionsClient} from "../functions/FunctionClient.sol";

abstract contract Consumer is IConsumer, FunctionsClient {
    using Functions for Functions.Request;

    IStonksly public immutable i_stonksly;
    uint64 public immutable i_subscriptionId;
    string internal s_requestSource;

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
}
