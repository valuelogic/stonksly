export interface ITicker {
  name: string
  priceUSD?: number
  priceMatic?: number
  sTokenAddress?: string
}

export interface IFormInputs {
  token: string
  maticAmount: number
  tokenAmount: number
}


const CONTRACTS = ['Stonksly', 'PurchaseConsumer', 'SaleConsumer'] as const
type ContractName = (typeof CONTRACTS)[number]
export interface IContractAddresses {
  [chainId: string]: Record<ContractName, string>
}