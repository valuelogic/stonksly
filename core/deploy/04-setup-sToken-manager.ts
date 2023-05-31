import { ethers } from "hardhat";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { STokenManager } from "../typechain-types/contracts/protocol/STokenManager";

const setUp = async (hre: HardhatRuntimeEnvironment) => {
  const { deployments } = hre;
  const { log } = deployments;

  log("Setting up STokenManager...");

  const stonksly = await ethers.getContract("Stonksly");
  const sTokenManager = (await ethers.getContract(
    "STokenManager"
  )) as STokenManager;

  const tx = await sTokenManager.transferOwnership(stonksly.address);
  await tx.wait();

  log("STokenManager is set up!");
};

export default setUp;
