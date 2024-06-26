import React from 'react'
import { Stocks } from './_stocksComponents/stocks'



export default async function StocksPage() {  
  return (
    <div className='flex flex-col w-full min-h-screen py-10 px-10 md:px-20'>
      <Stocks />
    </div>
  )
}
