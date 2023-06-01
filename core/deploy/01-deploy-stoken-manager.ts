import { HardhatRuntimeEnvironment } from "hardhat/types";
import { networkConfig } from "../helper-hardhat-config";
import verify from "../utils/verify";

const deploy = async (hre: HardhatRuntimeEnvironment) => {
  const { deployments, getNamedAccounts, network } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId!;

  const sTokenManager = await deploy("STokenManager", {
    from: deployer,
    log: true,
    waitConfirmations: networkConfig[chainId].confirmations || 0,
  });

  if (chainId !== 31337) {
    await verify(sTokenManager.address, []);
  }
};

export default deploy;
