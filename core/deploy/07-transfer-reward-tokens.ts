import { ethers } from "hardhat";
import { StonkslyToken } from "../typechain-types/contracts/protocol/StonkslyToken";
import { Stonksly } from "../typechain-types/contracts/protocol/Stonksly";

const transferRewardTokenToStonksly = async () => {
  const stonkslyToken = (await ethers.getContract(
    "StonkslyToken"
  )) as StonkslyToken;
  const stonksly = (await ethers.getContract("Stonksly")) as Stonksly;

  console.log("STokens are being transfered...");
  const amount = ethers.utils.parseEther("1");
  const tokensApprovalTx = await stonkslyToken.approve(stonksly.address, amount);
  await tokensApprovalTx.wait();
  console.log("Stonksly reward token approved!");
  const tokensTransferTx =await stonkslyToken.transfer(stonksly.address, amount);
  await tokensTransferTx.wait();
  console.log("Stonksly reward token transfered!");
};

export default transferRewardTokenToStonksly;
