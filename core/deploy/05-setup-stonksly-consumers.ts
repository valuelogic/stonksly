import { ethers } from "hardhat";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Stonksly } from "../typechain-types/contracts/protocol/Stonksly";

const setUp = async (hre: HardhatRuntimeEnvironment) => {
  const { deployments } = hre;
  const { log } = deployments;

  log("Setting up consumers...");

  const stonksly = (await ethers.getContract("Stonksly")) as Stonksly;
  const purchaseConsumer = await ethers.getContract("PurchaseConsumer");
  const saleConsumer = await ethers.getContract("SaleConsumer");

  const purchaseTx = await stonksly.setPurchaseConsumer(
    purchaseConsumer.address
  );
  await purchaseTx.wait();

  const saleTx = await stonksly.setSaleConsumer(saleConsumer.address);
  await saleTx.wait();

  log("Consumers are set up!");
};

export default setUp;
