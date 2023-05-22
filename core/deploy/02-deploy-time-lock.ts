import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { MIN_DELAY } from "../helper-hardhat-config";
import { networkConfig } from "../helper-hardhat-config";

const deployStonkslyGovernanceTimeLock: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  const { getNamedAccounts, deployments, network } = hre;
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  log("Deploying StonkslyTimeLock");
  const timeLock = await deploy("StonkslyTimeLock", {
    from: deployer,
    args: [MIN_DELAY, [], [], deployer],
    log: true,
    waitConfirmations: networkConfig[network.name].blockConfirmation || 0,
  });

};


export default deployStonkslyGovernanceTimeLock;
