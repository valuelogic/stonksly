import { IContractAddresses, IFormInputs, ITicker } from '@/types/types'
import { truncateBalance } from '@/utils/truncate'
import { ArrowDownIcon, ArrowUpIcon } from '@chakra-ui/icons'
import { Box, Button, Flex, FormControl, Input, Select, Text } from '@chakra-ui/react'
import { fetchBalance, readContract, waitForTransaction, writeContract } from '@wagmi/core'
import { BigNumber, constants, utils } from 'ethers'
import { ChangeEvent, useEffect, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { v4 as uuidv4 } from 'uuid'
import { parseEther } from 'viem'
import { useAccount, useBalance, useContractEvent, useContractWrite, useNetwork } from 'wagmi'
import StonkslyAbi from '../constants/abi/stonksly.json'
import contractAddresses from '../constants/contractsAddresses.json'
import stokenAbi from '../sToken.json'
import BalanceBox from './BalanceBox'

const Exchange = ({ tickersData }: { tickersData: ITicker[] }) => {
  const [buyMode, setMode] = useState<boolean>(true)
  const [currentTokenAddress, setCurrentTokenAddress] = useState<string | null>(null)
  const [fee, setFee] = useState<number>(0)
  const { chain } = useNetwork()
  const { address } = useAccount()
  const addresses: IContractAddresses = contractAddresses
  const chainId = chain?.id
  const stonkslyContractAddress =
    chainId && chainId in addresses ? addresses[chainId]['Stonksly'] : ''

  const { data: maticBalance } = useBalance({
    address: address,
    watch: true
  })

  useEffect(() => {
    if (!tickersData) return
    setCurrentTokenAddress(tickersData[0].sToken)
  }, [tickersData])

  const {
    reset,
    control,
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors }
  } = useForm<IFormInputs>({
    defaultValues: {
      token: tickersData[0].symbol,
      maticAmount: 0,
      tokenAmount: 0
    }
  })

  const getAllowance = async (tokenContractAddress: string) => {
    try {
      const allowanceAmount = await readContract({
        // @ts-ignore
        address: tokenContractAddress || '',
        abi: stokenAbi,
        functionName: 'allowance',
        args: [address, stonkslyContractAddress]
      })
      return allowanceAmount as BigNumber
    } catch (error) {
      return
    }
  }

  const { write: writeBuy } = useContractWrite({
    // @ts-ignore
    address: stonkslyContractAddress,
    abi: StonkslyAbi,
    functionName: 'initPurchase',
    onSuccess() {
      toast.success('Transaction sent, please wait.')
      const chosenToken = getValues('token')
      reset({
        token: chosenToken,
        maticAmount: 0,
        tokenAmount: 0
      })
      setFee(0)
    },
    onError(error) {
      toast.error('Something went wrong. Please try again later.')
    }
  })

  const { write: writeSell } = useContractWrite({
    // @ts-ignore
    address: stonkslyContractAddress,
    abi: StonkslyAbi,
    functionName: 'initSale',
    onSuccess() {
      toast.success('Transaction sent, please wait.')
      const chosenToken = getValues('token')
      reset({
        token: chosenToken,
        maticAmount: 0,
        tokenAmount: 0
      })
      setFee(0)
    },
    onError() {
      toast.error('Something went wrong. Please try again later.')
    }
  })

  useContractEvent({
    // @ts-ignore
    address: stonkslyContractAddress,
    abi: StonkslyAbi,
    eventName: 'RequestCompleted',
    listener() {
      toast.success('Transaction completed.')
    }
  })

  useContractEvent({
    // @ts-ignore
    address: stonkslyContractAddress,
    abi: StonkslyAbi,
    eventName: 'RequestCreated',
    listener() {
      toast.success('Transaction created, please wait for confirmation.')
    }
  })

  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    const token = tickersData.find((ticker) => ticker.symbol === data.token)
    if (!token?.sToken) return
    if (buyMode) {
      writeBuy?.({
        value: parseEther(`${data.maticAmount}`),
        args: [token.sToken]
      })
    } else {
      const allowanceAmount = await getAllowance(token.sToken)
      if (allowanceAmount === undefined) return
      const formattedAlowance = Number(utils.formatEther(allowanceAmount))
      if (formattedAlowance === 0 || formattedAlowance < Number(data.tokenAmount)) {
        try {
          const { hash } = await writeContract({
            // @ts-ignore
            address: token.sToken || '',
            abi: stokenAbi,
            functionName: 'approve',
            args: [stonkslyContractAddress, constants.MaxUint256]
          })
          await waitForTransaction({
            hash
          })
          writeSell?.({
            args: [token.sToken, utils.parseEther(data.tokenAmount.toString())]
          })
        } catch (error) {
          toast.error('Something went wrong. Please try again later.')
        }
      } else {
        writeSell?.({
          args: [token.sToken, utils.parseEther(data.tokenAmount.toString())]
        })
      }
    }
  }

  const handleMaticAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    const chosenToken = getValues('token')
    const token = tickersData.find((ticker) => ticker.symbol === chosenToken)
    if (!token?.priceMatic) return
    if (buyMode) {
      const fee = Number(value) * 0.001
      const maticForToken = Number(value) * 0.999
      const tokenAmountForMatic = maticForToken / token.priceMatic
      setFee(fee)
      setValue('tokenAmount', tokenAmountForMatic)
    } else {
      const totalMatic = Number(value) / 0.999
      const fee = totalMatic * 0.001
      const tokenAmountForMatic = totalMatic / token?.priceMatic
      setValue('tokenAmount', tokenAmountForMatic)
      setFee(fee)
    }
  }

  const handleTokenSelectChange = async (tokenName: string) => {
    const token = tickersData.find((ticker) => ticker.symbol === tokenName)
    if (!token?.priceMatic) return
    if (buyMode) {
      const maticAmount = getValues('maticAmount')
      const maticForToken = Number(maticAmount) * 0.999
      const tokenAmountForMatic = maticForToken / token.priceMatic
      setValue('tokenAmount', tokenAmountForMatic)
    } else {
      const tokenAmount = getValues('tokenAmount')
      const maticAmountForToken = Number(tokenAmount) * token.priceMatic
      const fee = Number(maticAmountForToken) * 0.001
      const maticForToken = Number(maticAmountForToken) * 0.999
      setValue('maticAmount', maticForToken)
      setFee(fee)
    }
    setCurrentTokenAddress(token.sToken)
  }

  const handleTokenAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    const chosenToken = getValues('token')
    const token = tickersData.find((ticker) => ticker.symbol === chosenToken)
    if (!token?.priceMatic) return
    const maticAmountForToken = Number(value) * token.priceMatic
    let fee
    let maticForToken
    if (!buyMode) {
      fee = Number(maticAmountForToken) * 0.001
      maticForToken = Number(maticAmountForToken) * 0.999
    } else {
      maticForToken = Number(maticAmountForToken) / 0.999
      fee = maticForToken * 0.001
    }
    setValue('maticAmount', maticForToken)
    setFee(fee)
  }

  const handleModeChange = () => {
    const chosenToken = getValues('token')
    reset({
      token: chosenToken,
      maticAmount: 0,
      tokenAmount: 0
    })
    setMode(!buyMode)

    setFee(0)
  }

  const handleMaxMaticClick = () => {
    if (!maticBalance) return
    const maticAmount = Number(maticBalance.formatted)
    setValue('maticAmount', maticAmount)
    const chosenToken = getValues('token')
    const token = tickersData.find((ticker) => ticker.symbol === chosenToken)
    if (!token?.priceMatic) return
    const fee = maticAmount * 0.001
    const maticForToken = maticAmount * 0.999
    const tokenAmountForMatic = maticForToken / token.priceMatic
    setFee(fee)
    setValue('tokenAmount', tokenAmountForMatic)
  }

  const handleMaxTokenClick = async () => {
    const chosenToken = getValues('token')
    const token = tickersData.find((ticker) => ticker.symbol === chosenToken)
    if (!token?.sToken || !token?.priceMatic) return
    try {
      const balance = await fetchBalance({
        //@ts-ignore
        address: address,
        //@ts-ignore
        token: token.sToken
      })

      if (balance) {
        const tokenAmount = Number(balance.formatted)
        setValue('tokenAmount', tokenAmount)
        const maticAmountForToken = tokenAmount * token.priceMatic
        const fee = maticAmountForToken * 0.001
        const maticForToken = maticAmountForToken * 0.999
        setValue('maticAmount', maticForToken)
        setFee(fee)
      }
    } catch (e) {}
  }

  return (
    <Box bg={'#fff'} p={20} style={{ borderRadius: '5%' }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {buyMode && (
          <Flex justifyContent="flex-end">
            <Text fontSize="xs" mt={2}>
              Balance: {maticBalance ? truncateBalance(Number(maticBalance.formatted)) : 0}
            </Text>
            <Button variant="ghost" colorScheme="blue" size="sm" onClick={handleMaxMaticClick}>
              Max
            </Button>
          </Flex>
        )}
        {!buyMode && currentTokenAddress && address && (
          <Flex justifyContent="flex-end">
            <BalanceBox token={currentTokenAddress} address={address} />
            <Button variant="ghost" colorScheme="blue" size="sm" onClick={handleMaxTokenClick}>
              Max
            </Button>
          </Flex>
        )}
        <div style={{ display: 'flex', flexDirection: buyMode ? 'column' : 'column-reverse' }}>
          <Flex>
            <>
              <FormControl mb={!buyMode ? 0 : 6} mr={2} w={220}>
                <Input
                  w={220}
                  placeholder="0"
                  id={'maticAmount'}
                  {...register('maticAmount', { required: true })}
                  onChange={handleMaticAmountChange}
                />
              </FormControl>
              {errors.maticAmount?.type === 'required' && (
                <Box style={{ color: 'red', marginBottom: '20px' }}>Matic amount is required.</Box>
              )}
            </>
            <Select disabled w={110}>
              <option>MATIC</option>
            </Select>
          </Flex>
          <Flex
            onClick={handleModeChange}
            style={{ cursor: 'pointer' }}
            mb={6}
            justifyContent="center"
          >
            <ArrowDownIcon />
            <ArrowUpIcon />
          </Flex>
          <Flex>
            <>
              <FormControl>
                <Input
                  w={220}
                  mr={2}
                  placeholder="0"
                  id={'tokenAmount'}
                  {...register('tokenAmount', { required: true })}
                  onChange={handleTokenAmountChange}
                />
              </FormControl>

              {errors.tokenAmount?.type === 'required' && (
                <Box style={{ color: 'red', marginBottom: '20px' }}>Token amount is required.</Box>
              )}
            </>
            <FormControl mb={buyMode ? 0 : 6}>
              <Controller
                control={control}
                name="token"
                render={({ field: { onChange, value } }) => {
                  return (
                    <Select
                      w={110}
                      value={value}
                      onChange={(e) => {
                        const { value } = e.target
                        onChange(value)
                        handleTokenSelectChange(value)
                      }}
                    >
                      {tickersData.map((ticker) => (
                        <option key={uuidv4()} value={ticker.symbol}>
                          {ticker.symbol}
                        </option>
                      ))}
                    </Select>
                  )
                }}
              />
            </FormControl>
          </Flex>
        </div>
        {!buyMode && (
          <Flex justifyContent="flex-end">
            <Text fontSize="xs" mt={2}>
              Balance: {maticBalance ? truncateBalance(Number(maticBalance.formatted)) : 0}
            </Text>
          </Flex>
        )}
        {buyMode && currentTokenAddress && address && (
          <BalanceBox token={currentTokenAddress} address={address} />
        )}
        <Box mb={4}>
          <Text fontSize="xs">
            <Text as="b">Fee: </Text>
            {` ${fee} MATIC`}
          </Text>
        </Box>
        <Button w={328} variant="outline" colorScheme="blue" size="md" type="submit">
          {`${buyMode ? 'Buy' : 'Sell'}`}
        </Button>
      </form>
    </Box>
  )
}

export default Exchange
