import React from 'react'
import { Box } from '@chakra-ui/react'
import { ITicker } from '@/mocks/tickers'

const TickerBox = ({ ticker }: { ticker: ITicker }) => {
  return (
    <>
      <Box m={10}>
        {ticker.name}: {ticker.priceUSD} USD / {ticker.priceMatic} MATIC
      </Box>
    </>
  )
}

export default TickerBox
