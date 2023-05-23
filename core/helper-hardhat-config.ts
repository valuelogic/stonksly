export const developmentChains = [31337];

export interface networkConfigItem {
  stonkslyWallet: string;
  oracleAddress?: string;
  maticPriceFeed?: string;
  confirmations?: number;
  subscriptionId?: number;
}

export interface networkConfigInfo {
  [key: string]: networkConfigItem;
}

export const networkConfig: networkConfigInfo = {
  31337: {
    oracleAddress: "0xeA6721aC65BCeD841B8ec3fc5fEdeA6141a0aDE4",
    maticPriceFeed: "0xd0D5e3DB44DE05E9F294BB0a3bEEaF030DE24Ada",
    stonkslyWallet: "0x25C55807bAE724998723579E8A3957Ecd4E326bb",
    subscriptionId: 993,
  },
  80001: {
    oracleAddress: "0xeA6721aC65BCeD841B8ec3fc5fEdeA6141a0aDE4",
    confirmations: 3,
    maticPriceFeed: "0xd0D5e3DB44DE05E9F294BB0a3bEEaF030DE24Ada",
    stonkslyWallet: "0x25C55807bAE724998723579E8A3957Ecd4E326bb",
    subscriptionId: 993,
  },
};


export const functionSourceFilePath = "./source.js";
