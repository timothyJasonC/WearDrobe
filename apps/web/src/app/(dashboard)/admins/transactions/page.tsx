'use client'
import DisplayOrder from '@/components/order/DisplayOrder'
import { Button } from '@/components/ui/button'
import { IOrder } from '@/constants'
import { getOrderByAdminId } from '@/lib/cart'
import { useEffect, useState } from 'react'

export default function page() {
  return (
    <section className='flex flex-col w-full min-h-screen py-10 px-10 md:px-20'>
      <div className='flex w-full mb-7 flex-col-reverse xl:flex-row'>
        <div className='flex flex-col w-full items-end mb-7'>
          <p className='text-xl'>Warehouse</p>
          <Button variant="ghost" className="text-4xl hover:bg-gray-100 rounded-none px-0 border-b-2 border-b-black">Bandung</Button>

        </div>
      </div>

      <DisplayOrder/>



    </section>
  )
}
