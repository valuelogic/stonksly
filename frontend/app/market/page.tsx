'use client'
import { useEffect, useState } from 'react'
import { readContract } from '@wagmi/core'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import { useNetwork, useAccount } from 'wagmi'
import { Flex } from '@chakra-ui/react'
import abi from '../../maticUsdPrice.json'
import Exchange from '@/components/Exchange'
import TickerBox from '@/components/TickerBox'
import { ITicker, tickers } from '@/mocks/tickers'

export default function Market() {
  const [tickersData, setTickerData] = useState<ITicker[]>([])
  const [usdMaticData, setUsdMaticData] = useState(null)
  const { isConnected } = useAccount()
  const { chain } = useNetwork()

  useEffect(() => {
    const getMaticPrice = async () => {
      const data = await readContract({
        address: '0xd0D5e3DB44DE05E9F294BB0a3bEEaF030DE24Ada',
        abi: abi,
        functionName: 'latestRoundData',
        args: []
      })
      if (data) {
        setUsdMaticData(data[1])
      }
    }
    if (chain?.name === 'Polygon Mumbai') {
      getMaticPrice()
    }
  }, [chain])

  useEffect(() => {
    if (usdMaticData) {
      const tickersData: ITicker[] = [...tickers]
      const maticPrice = Number(usdMaticData) / 1e8
      const getActualPrice = async (name: string) => {
        try {
          const response = await axios.get(`api/price/${name}`)
          if (response.status === 200) {
            return response.data.actualPrice
          }
        } catch (e) {}
      }
      const promises = []
      tickersData.forEach((ticker) => {
        try {
          promises.push(getActualPrice(ticker.name.toLowerCase()))
        } catch (e) {}
      })
      Promise.all(promises).then((results) => {
        tickersData.forEach((ticker, index) => {
          ticker.priceUSD = results[index]
          ticker.priceMatic = results[index] / maticPrice
        })
        const validTickerData = tickersData.filter((tickerData) => !!tickerData.priceUSD)
        setTickerData(validTickerData)
      })
    }
  }, [usdMaticData])

  if (!isConnected) return <>Connect wallet</>
  if (isConnected && chain?.name !== 'Polygon Mumbai') return <>Switch to Polygon Mumbai</>

  return (
    <Flex m={10} mt={100} justifyContent={'space-around'}>
      {tickersData.length > 0 && (
        <>
          <Flex direction={'column'}>
            {tickersData.map((ticker) => (
              <TickerBox key={uuidv4()} ticker={ticker} />
            ))}
          </Flex>
          <Exchange tickersData={tickersData} />
        </>
      )}
    </Flex>
  )
}
