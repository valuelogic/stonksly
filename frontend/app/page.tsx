'use client'

import Image from 'next/image'
import { Center } from '@chakra-ui/react'
import logo from './assets/Stonksly.png'

export default function Home() {
  return (
    <Center style={{ backgroundColor: '#fff', height: 'calc(100vh - 116px)' }}>
      <Image src={logo} alt="logo" width={700} height={700} />
    </Center>
  )
}
