"use client"
import {useEffect, useState} from "react";

export default function Home() {
    const [actualPrice, setActualPrice] = useState<any>()
    useEffect( () => {
        const getActualPrice = async () => {
            const actualPriceFetched = await fetch('api/price/aapl', { cache: 'no-store' })
            setActualPrice((await actualPriceFetched.json()).actualPrice)
        };
        getActualPrice().then()
    }, [])
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Stonksly: {actualPrice}
    </main>
  )
}
