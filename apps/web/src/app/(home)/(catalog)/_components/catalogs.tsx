'use client'
import { Selector } from '@/components/admDashboard/manageProductModal/selector'
import React, { useState } from 'react'

export const Catalogs = ({totalProduct}:{totalProduct:number}) => {
    const [sort, setSort] = useState('Newest')
  return (
    <div className="mt-5 md:mt-10 flex justify-between">
        <div>
        <p>Results</p>
        <p className='text-3xl h-full'>{totalProduct}</p>
        </div>

        <div className='w-40'>
            <p className='text-right mb-1'>Sort by:</p>
            <Selector 
            label="Sort by"
            state={['Newest', 'Low to high', 'High to low', 'Popularity']}
            setState={setSort}
            defValue={sort}
            />
        </div>
    </div>
  )
}
