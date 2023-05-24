'use client'
import './globals.css'

import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { Inter } from 'next/font/google'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { hardhat, polygonMumbai } from 'wagmi/chains'
import { ChakraProvider } from '@chakra-ui/react'
import { Header } from '@/components/header/Header'

const chains = [hardhat, polygonMumbai]
const projectId = 'STONKSLY'

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 1, chains }),
  publicClient
})
const ethereumClient = new EthereumClient(wagmiConfig, chains)

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ChakraProvider>
          <Header />
          <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>
          <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
        </ChakraProvider>
      </body>
    </html>
  )
}