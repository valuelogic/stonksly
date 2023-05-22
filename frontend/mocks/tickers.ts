export interface ITicker {
  name: string
  priceUSD?: number
  priceMatic?: number
}

export const tickers: ITicker[] = [{ name: 'AAPL' }, { name: 'TSLA' }]
