'use client'

import Image from 'next/image'
import { Center } from '@chakra-ui/react'
import logo from './assets/Stonksly.png'

export default function Home() {
  return (
    <Center style={{ backgroundColor: '#fff', height: '100vh' }}>
      <Image src={logo} alt="logo" width={500} height={500} />
    </Center>
  )
}
