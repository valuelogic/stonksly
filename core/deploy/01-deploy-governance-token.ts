import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { networkConfig } from "../helper-hardhat-config";
import { ethers } from "hardhat";

const deployStonkslyGovernanceToken: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  const { getNamedAccounts, deployments, network } = hre;
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  log("Deploying StonkslyGovernanceToken");
  const stonkslyGovernanceToken = await deploy("StonkslyGovernanceToken", {
    from: deployer,
    args: [],
    log: true,
    waitConfirmations: networkConfig[network.name].blockConfirmation || 0,
  });
  log(
    `Deploying StonkslyGovernanceToken to address ${stonkslyGovernanceToken.address}`
  );
  await delegateGovernanceToken(stonkslyGovernanceToken.address, deployer);
  log(`Delegated`);
};

const delegateGovernanceToken = async (
  tokenAddress: string,
  account: string
) => {
  const stonkslyGovernanceToken = await ethers.getContractAt(
    "StonkslyGovernanceToken",
    tokenAddress
  );
  const tx = await stonkslyGovernanceToken.delegate(account);
  await tx.wait(1);
  console.log(
    `Checkpoints ${await stonkslyGovernanceToken.numCheckpoints(account)}`
  );
};

export default deployStonkslyGovernanceToken;
