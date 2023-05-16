// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract StonkslyAssets is Ownable {
    bytes[] s_availableAssets;

    // TODO: add token creation when new ticker added
    function addAsset(string memory newAsset) public onlyOwner {
        s_availableAssets.push(bytes(newAsset));
    }

    function showAssets() public view returns (bytes[] memory) {
        return s_availableAssets;
    }
}
