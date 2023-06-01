import React from 'react'
import { Web3Button } from '@web3modal/react'
import NextLink from 'next/link'
import { Box, Flex, Link } from '@chakra-ui/react'

export const Header = () => (
  <Box as="header" m={4}>
  <Flex alignItems="center" justifyContent="space-between">
    <Flex>
      <Link as={NextLink} href="/" ml={10}>
        Home
      </Link>
      <Link as={NextLink} href="/market" ml={20}>
        Market
      </Link>
    </Flex>
    <Box m={6}>
      <Web3Button />
    </Box>
  </Flex>
</Box>
)
