import React from 'react'
import { Box } from '@chakra-ui/react'
import { ITicker } from '@/types/types'

const TickerBox = ({ ticker }: { ticker: ITicker }) => {
  return (
    <>
      <Box m={10}>
        {ticker.assetSymbol}: {ticker?.priceUSD} USD / {ticker?.priceMatic} MATIC
      </Box>
    </>
  )
}

export default TickerBox
