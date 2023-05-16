export const developmentChains = ["hardhat", "localhost"];

export interface networkConfigItem {
  chainId: number;
  blockConfirmation?: number;
}

export interface networkConfigInfo {
  [key: string]: networkConfigItem;
}

export const networkConfig: networkConfigInfo = {
  hardhat: {
    chainId: 31337,
    blockConfirmation: 1,
  },
  localhost: {
    chainId: 31337,
    blockConfirmation: 1,
  },
};

export const MIN_DELAY = 36000;
export const VOTING_PERIOD = 5;
export const VOTING_DELAY = 1;
export const QUORUM_PERCENTAGE = 50;
export const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000"