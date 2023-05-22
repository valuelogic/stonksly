import { ChangeEvent, useState } from 'react'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'
import { Box, Button, FormControl, FormLabel } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import { Select } from '@chakra-ui/react'
import { ITicker } from '@/mocks/tickers'

interface IFormInputs {
  token: string
  maticAmount: number
  tokenAmount: number
  fee: number
}

const Exchange = ({ tickersData }: { tickersData: ITicker[] }) => {
  const [buyMode, setMode] = useState<boolean>(true)
  const [fee, setFee] = useState<number>(0)

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
      token: tickersData[0].name,
      maticAmount: 0,
      tokenAmount: 0
    }
  })

  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    console.log('data to submit', data)
    console.log('fee', fee)
  }

  const handleMaticAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    const chosenToken = getValues('token')
    const token = tickersData.find((ticker) => ticker.name === chosenToken)
    if (!token?.priceMatic) return
    const fee = Number(value) * 0.01
    const maticForToken = Number(value) * 0.99
    const tokenAmountForMatic = maticForToken / token.priceMatic
    setFee(fee)
    setValue('tokenAmount', tokenAmountForMatic)
  }

  const handleTokenSelectChange = (tokenName: string) => {
    const token = tickersData.find((ticker) => ticker.name === tokenName)
    if (!token?.priceMatic) return
    if (buyMode) {
      const maticAmount = getValues('maticAmount')
      const maticForToken = Number(maticAmount) * 0.99
      const tokenAmountForMatic = maticForToken / token.priceMatic
      setValue('tokenAmount', tokenAmountForMatic)
    } else {
      const tokenAmount = getValues('tokenAmount')
      const maticAmountForToken = Number(tokenAmount) * token.priceMatic
      const fee = Number(maticAmountForToken) * 0.01
      const maticForToken = Number(maticAmountForToken) * 0.99
      setValue('maticAmount', maticForToken)
      setFee(fee)
    }
  }

  const handleTokenAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    const chosenToken = getValues('token')
    const token = tickersData.find((ticker) => ticker.name === chosenToken)
    if (!token?.priceMatic) return
    const maticAmountForToken = Number(value) * token.priceMatic
    const fee = Number(maticAmountForToken) * 0.01
    const maticForToken = Number(maticAmountForToken) * 0.99
    setValue('maticAmount', maticForToken)
    setFee(fee)
  }

  const handleModeChange = () => {
    setMode(!buyMode)
    reset()
    setFee(0)
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
                      <option key={uuidv4()} value={ticker.name}>
                        {ticker.name}
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
