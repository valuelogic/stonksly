import React from 'react'
import { Box, Text } from '@chakra-ui/react'
import { ITicker } from '@/types/types'
import { truncateNumber } from '@/utils/truncate'

const TickerBox = ({ ticker }: { ticker: ITicker }) => {
  return (
    <>
      <Box m={10}>
        <Text as='b'>{ticker.assetSymbol}:</Text> {truncateNumber(ticker?.priceUSD || 0)} USD / {truncateNumber(ticker?.priceMatic || 0)} MATIC
      </Box>
    </>
  )
}

export default TickerBox
