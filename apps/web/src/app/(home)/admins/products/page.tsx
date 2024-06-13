import { AdmTable } from '@/components/admDashboard/admTable'
import { StatisticsCard } from '@/components/admDashboard/statisticsCard'
import { WarehouseDropdown } from '@/components/admDashboard/warehouseDropdown'
import React from 'react'
import { Input } from "@/components/ui/input"
import { PiMagnifyingGlass } from "react-icons/pi";
import { getCategory } from '@/app/action'
import { ManageCategoryDialog } from '@/components/admDashboard/manageCategoryModal/categoryDialog'


export default async function Products() {
  const data = await getCategory("", "")

  return (
    <div className='flex flex-col w-full min-h-screen py-10 px-10 md:px-20'>
      <div className='flex w-full mb-7 flex-col-reverse xl:flex-row'>
        <div className='flex gap-5 md:gap-10 max-md:flex-wrap'>
          <StatisticsCard
            title='Products'
            number='52'
          />
          <StatisticsCard
            title='Categories'
            number={data.category.length}
            modalElement={<ManageCategoryDialog />}
          />
        </div>
        <div className='flex flex-col w-full items-end mb-7'>
          <p className='text-xl'>Warehouse</p>
          <WarehouseDropdown />
        </div>
      </div>

      <div>
        <div className='flex items-center justify-end gap-2'>
          <label htmlFor="search"><PiMagnifyingGlass className='text-2xl' /></label>
          <Input type="text" placeholder="Search products" className='max-w-60' />
        </div>
        <AdmTable />
      </div>

    </div>
  )
}
