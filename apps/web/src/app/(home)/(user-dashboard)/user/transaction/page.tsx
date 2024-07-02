'use client'
import DisplayOrder from '@/components/order/DisplayOrder'
import React from 'react'

export default function page() {
  return (
    <section className='flex flex-col w-full min-h-screen py-10 px-10 md:px-20'>
      <DisplayOrder />
    </section>
  )
}
