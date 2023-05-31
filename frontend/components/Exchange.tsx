import { ChangeEvent, useState } from 'react'
import { readContract, writeContract, fetchBalance, waitForTransaction } from '@wagmi/core'
import { utils } from 'ethers'
import { BigNumber } from 'ethers'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'
import { parseEther } from 'viem'
import { useAccount, useBalance, useContractEvent, useContractWrite, useNetwork } from 'wagmi'
import { Box, Button, FormControl, FormLabel } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import { Select } from '@chakra-ui/react'
import StonkslyAbi from '../constants/abi/stonksly.json'
import contractAddresses from '../constants/contractsAddresses.json'
import stokenAbi from '../sToken.json'
import { IContractAddresses, IFormInputs, ITicker } from '@/types/types'

const Exchange = ({ tickersData }: { tickersData: ITicker[] }) => {
  const [buyMode, setMode] = useState<boolean>(true)
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
      token: tickersData[0].assetSymbol,
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
    onSuccess(data) {
      reset()
      setFee(0)
    },
    onError(error) {
      console.log('error writeBuy', error)
    }
  })

  const { write: writeSell } = useContractWrite({
    // @ts-ignore
    address: stonkslyContractAddress,
    abi: StonkslyAbi,
    functionName: 'initSale',
    onSuccess(data) {
      reset()
      setFee(0)
    },
    onError(error) {
      console.log('error writeSell', error)
    }
  })
  useContractEvent({
    // @ts-ignore
    address: stonkslyContractAddress,
    abi: StonkslyAbi,
    eventName: 'RequestCompleted',
    listener(log) {
      console.log(log)
    }
  })

  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    const token = tickersData.find((ticker) => ticker.assetSymbol === data.token)
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
            args: [stonkslyContractAddress, utils.parseEther(data.maticAmount.toString())]
          })
          await waitForTransaction({
            hash
          })

          writeSell?.({
            args: [token.sToken, utils.parseEther(data.tokenAmount.toString())]
          })
        } catch (error) {
          console.log('error', error)
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
    const token = tickersData.find((ticker) => ticker.assetSymbol === chosenToken)
    if (!token?.priceMatic) return
    const fee = Number(value) * 0.001
    const maticForToken = Number(value) * 0.999
    const tokenAmountForMatic = maticForToken / token.priceMatic
    setFee(fee)
    setValue('tokenAmount', tokenAmountForMatic)
  }

  const handleTokenSelectChange = (tokenName: string) => {
    const token = tickersData.find((ticker) => ticker.assetSymbol === tokenName)
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
  }

  const handleTokenAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    const chosenToken = getValues('token')
    const token = tickersData.find((ticker) => ticker.assetSymbol === chosenToken)
    if (!token?.priceMatic) return
    const maticAmountForToken = Number(value) * token.priceMatic
    const fee = Number(maticAmountForToken) * 0.001
    const maticForToken = Number(maticAmountForToken) * 0.999
    setValue('maticAmount', maticForToken)
    setFee(fee)
  }

  const handleModeChange = () => {
    setMode(!buyMode)
    reset()
    setFee(0)
  }

  const handleMaxMaticClick = () => {
    if (!maticBalance) return
    const maticAmount = Number(maticBalance.formatted)
    setValue('maticAmount', maticAmount)
    const chosenToken = getValues('token')
    const token = tickersData.find((ticker) => ticker.assetSymbol === chosenToken)
    if (!token?.priceMatic) return
    const fee = maticAmount * 0.001
    const maticForToken = maticAmount * 0.999
    const tokenAmountForMatic = maticForToken / token.priceMatic
    setFee(fee)
    setValue('tokenAmount', tokenAmountForMatic)
  }

  const handleMaxTokenClick = async () => {
    const chosenToken = getValues('token')
    const token = tickersData.find((ticker) => ticker.assetSymbol === chosenToken)
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
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ display: 'flex', flexDirection: buyMode ? 'column' : 'column-reverse' }}>
          <FormControl mb={10}>
            <FormLabel htmlFor={'maticAmount'}>Matic amount</FormLabel>
            <Input
              disabled={!buyMode}
              placeholder="matic"
              id={'maticAmount'}
              {...register('maticAmount', { required: true })}
              onChange={handleMaticAmountChange}
            />
          </FormControl>
          {buyMode && <Button onClick={handleMaxMaticClick}>Max</Button>}
          {errors.maticAmount?.type === 'required' && (
            <Box style={{ color: 'red', marginBottom: '20px' }}>Matic amount is required.</Box>
          )}
          <FormControl mb={10}>
            <FormLabel htmlFor={'token'}>Select Token</FormLabel>
            <Controller
              control={control}
              name="token"
              render={({ field: { onChange, value } }) => {
                return (
                  <Select
                    value={value}
                    onChange={(e) => {
                      const { value } = e.target
                      onChange(value)
                      handleTokenSelectChange(value)
                    }}
                  >
                    {tickersData.map((ticker) => (
                      <option key={uuidv4()} value={ticker.assetSymbol}>
                        {ticker.assetSymbol}
                      </option>
                    ))}
                  </Select>
                )
              }}
            />
          </FormControl>
          <FormControl mb={10}>
            <FormLabel htmlFor={'tokenAmount'}>Token amount</FormLabel>
            <Input
              disabled={buyMode}
              placeholder="token"
              id={'tokenAmount'}
              {...register('tokenAmount', { required: true })}
              onChange={handleTokenAmountChange}
            />
          </FormControl>
          {!buyMode && <Button onClick={handleMaxTokenClick}>Max</Button>}
          {errors.tokenAmount?.type === 'required' && (
            <Box style={{ color: 'red', marginBottom: '20px' }}>Token amount is required.</Box>
          )}
        </div>
        <Box mb={10}>{`Fee: ${fee} MATIC`}</Box>
        <Button colorScheme="blue" size="md" type="submit">
          {`${buyMode ? 'Buy' : 'Sell'}`}
        </Button>
      </form>
      <Button mt={10} colorScheme="blue" size="md" onClick={handleModeChange}>
        change mode
      </Button>
    </Box>
  )
}

export default Exchange
