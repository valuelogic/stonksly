// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SToken is ERC20, Ownable {
    string private s_assetSymbol;

    constructor(
        string memory _name,
        string memory _symbol,
        string memory _assetSymbol
    ) ERC20(_name, _symbol) {
        s_assetSymbol = _assetSymbol;
    }

    function mint(address _to, uint256 _amount) external onlyOwner {
        _mint(_to, _amount);
    }

    function burn(address _from, uint256 _amount) external onlyOwner {
        _burn(_from, _amount);
    }

    function getAssetSymbol() external view returns (string memory) {
        return s_assetSymbol;
    }
}
