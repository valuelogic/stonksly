// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.18;

import "./SToken.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract STokenManager is Ownable {
    struct STokenWithData {
        address sToken;
        string symbol;
        string assetSymbol;
    }

    address[] s_sTokens;

    event STokenCreated(
        address token,
        string name,
        string symbol,
        string assetSymbol
    );

    function deploySToken(
        string memory _name,
        string memory _symbol,
        string memory _assetSymbol
    ) external onlyOwner returns (address) {
        SToken sToken = new SToken(_name, _symbol, _assetSymbol);
        sToken.transferOwnership(msg.sender);

        address sTokenAddress = address(sToken);
        s_sTokens.push(sTokenAddress);

        emit STokenCreated(sTokenAddress, _name, _symbol, _assetSymbol);

        return sTokenAddress;
    }

    function getSTokens() external view returns (STokenWithData[] memory) {
        address[] memory sTokens = s_sTokens;
        STokenWithData[] memory sTokensWithData = new STokenWithData[](
            sTokens.length
        );
        for (uint i = 0; i < sTokens.length; i++) {
            SToken sToken = SToken(sTokens[i]);
            sTokensWithData[i] = STokenWithData(
                address(sToken),
                sToken.symbol(),
                sToken.getAssetSymbol()
            );
        }
        return sTokensWithData;
    }
}
