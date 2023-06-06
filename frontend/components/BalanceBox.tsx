import React from 'react'
import { useBalance } from 'wagmi'
import { Flex, Text } from '@chakra-ui/react'
import { truncateBalance } from '@/utils/truncate'

const BalanceBox = ({ address, token }: { address: string; token: string }) => {
  const { data } = useBalance({
    // @ts-ignore
    address,
    watch: true,
    // @ts-ignore
    token
  })

  return (
    <Flex justifyContent="flex-end">
      <Text fontSize="xs" mt={2}>
        Balance: {truncateBalance(Number(data?.formatted || 0))}
      </Text>
    </Flex>
  )
}

export default BalanceBox
