import "@nomicfoundation/hardhat-toolbox";
import "@openzeppelin/hardhat-upgrades";
import "dotenv/config";
import "hardhat-deploy";
import { HardhatUserConfig } from "hardhat/config";

const PRIVATE_KEY = process.env.PRIVATE_KEY || "Private key";
const MUMBAI_URL = process.env.MUMBAI_URL || "Mumbai url";
const POLYGONSCAN_API_KEY = process.env.POLYGONSCAN_API_KEY || "Scan api key";

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.18",
      },
    ],

    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      allowUnlimitedContractSize: true,
      chainId: 31337,
    },
    polygonMumbai: {
      url: MUMBAI_URL,

      accounts: [
        PRIVATE_KEY
      ],

      chainId: 80001,
    },
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
  etherscan: {
    apiKey: POLYGONSCAN_API_KEY,
  },
};

export default config;
