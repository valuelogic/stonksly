import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { VOTING_PERIOD, VOTING_DELAY, QUORUM_PERCENTAGE } from "../helper-hardhat-config";
import { networkConfig } from "../helper-hardhat-config";

const deployStonkslyGovernor: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  const { getNamedAccounts, deployments, network } = hre;
  const { deploy, log, get } = deployments;
  const { deployer } = await getNamedAccounts();
  log("Deploying StonkslyGovernor");
  const governanceToken = await get('StonkslyGovernanceToken')
  const timeLock = await get('StonkslyTimeLock')
  const governor = await deploy("StonkslyGovernor", {
    from: deployer,
    args: [governanceToken.address, timeLock.address, VOTING_DELAY, VOTING_PERIOD, QUORUM_PERCENTAGE],
    log: true,
    waitConfirmations: networkConfig[network.name].blockConfirmation || 0,
  });

};

export default deployStonkslyGovernor;
