'use client'
import { useEffect, useState } from 'react'
import { readContract } from '@wagmi/core'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import { useNetwork, useAccount } from 'wagmi'
import { Center, Flex } from '@chakra-ui/react'
import { Spinner } from '@chakra-ui/react'
import stokenmanagerAbi from '../../constants/abi/stokenmanager.json'
import contractAddresses from '../../constants/contractsAddresses.json'
import abi from '../../maticUsdPrice.json'
import Exchange from '@/components/Exchange'
import TickerBox from '@/components/TickerBox'
import { IContractAddresses, ITicker } from '@/types/types'

export default function Market() {
  const [tickersData, setTickerData] = useState<ITicker[]>([])
  const [usdMaticData, setUsdMaticData] = useState(null)
  const [sTokens, setSTokens] = useState<ITicker[]>([])
  const { isConnected } = useAccount()
  const { chain } = useNetwork()
  const addresses: IContractAddresses = contractAddresses
  const chainId = chain?.id
  const STokenManagerContractAddress =
    chainId && chainId in addresses ? addresses[chainId]['STokenManager'] : ''

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
    const getTokensData = async () => {
      const data = await readContract({
        // @ts-ignore
        address: STokenManagerContractAddress,
        abi: stokenmanagerAbi,
        functionName: 'getSTokens',
        args: []
      })

      if (data) {
        setSTokens(data)
      }
    }

    if (chain?.name === 'Polygon Mumbai') {
      getMaticPrice()
      getTokensData()
    }
  }, [chain])

  useEffect(() => {
    if (usdMaticData && sTokens.length > 0) {
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
      sTokens.forEach((ticker) => {
        try {
          promises.push(getActualPrice(ticker.assetSymbol.toLowerCase()))
        } catch (e) {}
      })
      Promise.all(promises).then((results) => {
        sTokens.forEach((ticker, index) => {
          ticker.priceUSD = results[index]
          ticker.priceMatic = results[index] / maticPrice
        })
        const validTickerData = sTokens.filter((tickerData) => !!tickerData.priceUSD)
        setTickerData(validTickerData)
      })
    }
  }, [usdMaticData, sTokens])

  return (
    <>
      {!isConnected && <Center>Connect wallet</Center>}
      {isConnected && chain?.name !== 'Polygon Mumbai' && <Center>Switch to Polygon Mumbai</Center>}
      {isConnected && chain?.name === 'Polygon Mumbai' && (
        <Flex m={10} mt={100} justifyContent={'space-around'}>
          {tickersData.length > 0 && (
            <>
              <Flex direction={'column'} bg="#fff" p={20} style={{ borderRadius: '5%' }}>
                {tickersData.map((ticker) => (
                  <TickerBox key={uuidv4()} ticker={ticker} />
                ))}
              </Flex>
              <Exchange tickersData={tickersData} />
            </>
          )}
          {tickersData.length === 0 && <Spinner size="xl" />}
        </Flex>
      )}
    </>
  )
}
