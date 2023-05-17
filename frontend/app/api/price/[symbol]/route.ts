import { NextResponse } from 'next/server';

export async function GET(request: Request, {params} : {params: {symbol: string}}) {

    const url = 'https://realstonks.p.rapidapi.com/TSLA';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': process.env.RAPID_API_KEY,
            'X-RapidAPI-Host': 'realstonks.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        return NextResponse.json({ actualPrice: result.price });
    } catch (error) {
        console.error(error);
    }
}