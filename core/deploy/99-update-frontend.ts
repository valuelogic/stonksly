import { DeployFunction } from "hardhat-deploy/types";
import { existsSync, writeFileSync, readFileSync, mkdirSync, cpSync } from "fs";
import path from "path";
import { ethers } from "hardhat";

const CONSTANTS_DIRECTORY = "../../frontend/constants";
const CONTRACT_ADDRESSES_FILE = `${CONSTANTS_DIRECTORY}/contractAddresses.json`;
const CONTRACT_ABI_DIRECTORY = `${CONSTANTS_DIRECTORY}/abi`;
const CONTRACT_TYPES_FILE = `${CONSTANTS_DIRECTORY}/typechainTypes`;
const CONTRACTS = ["StonkslyAssets"] as const;
type ContractName = (typeof CONTRACTS)[number];
interface IContractAddresses {
  [chainId: string]: Record<ContractName, string>;
}

const updateFrontend: DeployFunction = async ({ network }) => {
  if (process.env.UPDATE_FRONTEND) {
    console.log("Updating frontend files...");
    const chainId = network.config.chainId!;

    if (!existsSync(path.resolve(__dirname, CONSTANTS_DIRECTORY))) {
      mkdirSync(path.resolve(__dirname, CONSTANTS_DIRECTORY), {
        recursive: true,
      });
    }
    await Promise.all([updateAddresses(chainId), updateAbi(), updateTypes()]);
  }
};
const updateAbi = async () => {
  if (!existsSync(path.resolve(__dirname, CONTRACT_ABI_DIRECTORY))) {
    mkdirSync(path.resolve(__dirname, CONTRACT_ABI_DIRECTORY), {
      recursive: true,
    });
  }
  for (const contractName of CONTRACTS) {
    console.log(`Updating ${contractName} abi...`);
    const contract = await ethers.getContract(contractName);
    writeFileSync(
      path.resolve(
        __dirname,
        `${CONTRACT_ABI_DIRECTORY}/${contractName.toLowerCase()}.json`
      ),
      contract.interface.format(ethers.utils.FormatTypes.json) as string
    );
  }
};

const updateAddresses = async (chainId: number) => {
  if (!existsSync(path.resolve(__dirname, CONTRACT_ADDRESSES_FILE))) {
    writeFileSync(
      path.resolve(__dirname, CONTRACT_ADDRESSES_FILE),
      JSON.stringify({}),
      { flag: "w" }
    );
  }

  let currentAddresses: IContractAddresses = existsSync(
    path.resolve(__dirname, CONTRACT_ADDRESSES_FILE)
  )
    ? JSON.parse(
        readFileSync(path.resolve(__dirname, CONTRACT_ADDRESSES_FILE), "utf-8")
      )
    : {};

  currentAddresses[chainId] = currentAddresses[chainId] || {};

  for (const contractName of CONTRACTS) {
    console.log(`Updating ${contractName} address...`);
    currentAddresses[chainId][contractName] = (
      await ethers.getContract(contractName)
    ).address;
  }
  console.log("currentAddresses here", currentAddresses);
  writeFileSync(
    path.resolve(__dirname, CONTRACT_ADDRESSES_FILE),
    JSON.stringify(currentAddresses)
  );
};

const updateTypes = async () => {
  cpSync("./typechain-types", path.resolve(__dirname, CONTRACT_TYPES_FILE), {
    recursive: true,
  });
};
export default updateFrontend;
updateFrontend.tags = ["all", "update-frontend"];
