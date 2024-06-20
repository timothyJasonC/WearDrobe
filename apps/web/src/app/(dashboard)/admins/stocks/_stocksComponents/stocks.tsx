import { StockTable } from '@/components/admDashboard/manageStocksModal/stocksTable'
import { StatisticsCard } from '@/components/admDashboard/statisticsCard'
import { WarehouseDropdown } from '@/components/admDashboard/warehouseDropdown'
import React from 'react'



export const Stocks = () => {  
  return (
    <div>  
      <div className='flex w-full mb-7 flex-col-reverse xl:flex-row'>
        <div className='flex gap-5 md:gap-10 max-md:flex-wrap'>

          <StatisticsCard 
            title='Total Inventories'
            number={891}
          />
        </div>
        <div className='flex flex-col w-full items-end mb-7'>
            <p className='text-xl'>Warehouse</p>
            <WarehouseDropdown />
        </div>
      </div>

      <div>
        <StockTable />
      </div>   
    </div>
  )
}
