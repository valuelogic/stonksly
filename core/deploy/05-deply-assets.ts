import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { networkConfig } from "../helper-hardhat-config";
import { ethers } from "hardhat";

const deployStonkslyAssets: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  const { getNamedAccounts, deployments } = hre;
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  log("Deploying StonkslyAssets");
  const assets = await deploy("StonkslyAssets", {
    from: deployer,
    args: [],
    log: true,
  });
  const assetsTimeLock = await ethers.getContract("StonkslyTimeLock");
  const assetsContract = await ethers.getContract("StonkslyAssets");
  const transferOwnershipTx = await assetsContract.transferOwnership(
    assetsTimeLock.address
  );
  await transferOwnershipTx.wait(1)
};

export default deployStonkslyAssets;
