export interface ITicker {
  assetSymbol: string
  sToken: string
  symbol: string
  priceUSD?: number
  priceMatic?: number
}
export interface IFormInputs {
  token: string
  maticAmount: number
  tokenAmount: number
}

const CONTRACTS = ['Stonksly', 'STokenManager'] as const
type ContractName = (typeof CONTRACTS)[number]
export interface IContractAddresses {
  [chainId: string]: Record<ContractName, string>
}
