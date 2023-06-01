import { ethers } from "hardhat";
import { Stonksly } from "../typechain-types/contracts/protocol/Stonksly";

const createSTokens = async () => {
  const tokensData = [
    { name: "Apple", symbol: "SAPPL", assetSymbol: "APPL" },
    { name: "Microsoft", symbol: "SMSFT", assetSymbol: "MSFT" },
    { name: "Tesla", symbol: "STSLA", assetSymbol: "TSLA" },
  ];
  const stonksly = (await ethers.getContract("Stonksly")) as Stonksly;

  console.log("STokens are being created...");

  for (let token of tokensData) {
    await stonksly.createSToken(token.name, token.symbol, token.assetSymbol);
  }

  console.log("STokens have been created");
};

export default createSTokens;