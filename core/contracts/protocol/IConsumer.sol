// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

interface IConsumer {
    function init(uint256 _stonkslyRequestId, string[] calldata args) external;
}
