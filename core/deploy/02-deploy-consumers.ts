import fs from "fs";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import {
  functionSourceFilePath,
  networkConfig,
} from "../helper-hardhat-config";
import verify from "../utils/verify";

const deploy = async (hre: HardhatRuntimeEnvironment) => {
  const { deployments, getNamedAccounts, network } = hre;
  const { deploy, get } = deployments;
  const { deployer } = await getNamedAccounts();

  const chainId = network.config.chainId!;
  const stonksly = await get("Stonksly");
  const subscriptionId = networkConfig[chainId].subscriptionId;
  const sourceCode = fs.readFileSync(functionSourceFilePath).toString();
  const oracle = networkConfig[chainId].oracleAddress;

  const args = [stonksly.address, subscriptionId, sourceCode, oracle];

  const purchaseConsumer = await deploy("PurchaseConsumer", {
    from: deployer,
    args: args,
    log: true,
    waitConfirmations: networkConfig[chainId].confirmations || 0,
  });

   const saleConsumer = await deploy("SaleConsumer", {
     from: deployer,
     args: args,
     log: true,
     waitConfirmations: networkConfig[chainId].confirmations || 0,
   });

  if (chainId !== 31337) {
    await verify(purchaseConsumer.address, args);
    await verify(saleConsumer.address, args);
  }
};

export default deploy;
