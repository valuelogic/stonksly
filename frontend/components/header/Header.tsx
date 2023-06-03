import React from 'react'
import { Web3Button } from '@web3modal/react'
import Image from 'next/image'
import NextLink from 'next/link'
import { Box, Flex, Link, Text } from '@chakra-ui/react'
import logo from '../../app/assets/Stonksly.png'

export const Header = () => (
  <Box as="header" p={2} backgroundColor="#fff">
    <Flex alignItems="center" justifyContent="space-between">
      <Flex alignItems="center">
        <Link as={NextLink} href="/" ml={10}>
          <Image src={logo} alt="logo" width={100} height={100} />
        </Link>
        <Link as={NextLink} href="/market" ml={20} style={{ textDecoration: 'none' }}>
          <Text as="b">
            Market
          </Text>
        </Link>
      </Flex>
      <Box m={6}>
        <Web3Button />
      </Box>
    </Flex>
  </Box>
)
