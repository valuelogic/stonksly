import { HardhatRuntimeEnvironment } from "hardhat/types";
import { networkConfig } from "../helper-hardhat-config";
import verify from "../utils/verify";

const deploy = async (hre: HardhatRuntimeEnvironment) => {
  const { deployments, getNamedAccounts, network } = hre;
  const { deploy, get } = deployments;
  const { deployer } = await getNamedAccounts();

  const chainId = network.config.chainId!;

  const stonkslyWallet = networkConfig[chainId].stonkslyWallet;
  const maticPriceFeed = networkConfig[chainId].maticPriceFeed;
  const sTokenManager = await get("STokenManager");

  const args = [stonkslyWallet, maticPriceFeed, sTokenManager.address];

  const stonksly = await deploy("Stonksly", {
    from: deployer,
    args: args,
    log: true,
    waitConfirmations: networkConfig[chainId].confirmations || 0,
  });

  if (chainId !== 31337) {
    await verify(stonksly.address, args);
  }
};

export default deploy;
