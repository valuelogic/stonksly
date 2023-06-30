// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract StonkslyToken is ERC20, Ownable {
    constructor() ERC20('StonkslyToken', 'STK') {
        _mint(msg.sender, 1e18 * 100000);
    }
}
