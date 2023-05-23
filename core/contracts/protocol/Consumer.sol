// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "./Stonksly.sol";
import {Functions, FunctionsClient} from "../functions/FunctionClient.sol";

abstract contract Consumer is FunctionsClient {
    using Functions for Functions.Request;

    Stonksly public immutable i_stonksly;
    uint64 public immutable i_subscriptionId;
    string internal s_requestSource;

    mapping(bytes32 => uint256) internal s_requests;

    constructor(
        Stonksly _stonksly,
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
    ) external {
        Functions.Request memory req;
        req.initializeRequest(
            Functions.Location.Inline,
            Functions.CodeLanguage.JavaScript,
            s_requestSource
        );
        req.addArgs(args);
        bytes32 requestId = sendRequest(req, i_subscriptionId, 300000);

        s_requests[requestId] = _stonkslyRequestId;
    }
}
