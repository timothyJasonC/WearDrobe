'use client'
import { getAllStock, getProduct, getWarehouse } from '@/app/action'
import { StockDialog } from '@/app/(dashboard)/admins/stocks/_components/stocksDialog'
import { StockTable } from '@/app/(dashboard)/admins/stocks/_components/stocksTable'
import { StatisticsCard } from '@/app/(dashboard)/_components/statisticsCard'
import { WarehouseDropdown } from '@/app/(dashboard)/_components/warehouseDropdown'
import { PaginationTemplate } from '@/components/pagination'
import { Input } from '@/components/ui/input'
import { IProduct, IWarehouse } from '@/constants'
import { getAdminClientSide } from '@/lib/utils'
import React, { useEffect, useState } from 'react'
import { PiArrowSquareOut, PiMagnifyingGlass } from 'react-icons/pi'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { DatePickerWithRange } from './datePicker'
import { DateRange } from "react-day-picker"
import { PiFileArrowDownFill } from "react-icons/pi";

const monthFirstDate = () => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), 1);
}

export const Stocks = () => {  
  const [selectedWH, setSelectedWH] = useState('All Warehouses')
  const [warehouseList, setWarehouseList] = useState<IWarehouse[]>([])
  const [productList, setProductList] = useState<IProduct[]>([])
  const [inventory, setInventory] = useState(0)
  const [productQty, setProductQty] = useState(0)
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1)
  const [isSuper, setIsSuper] = useState(false)
  const [date, setDate] = useState<DateRange | undefined>({
    from: monthFirstDate(),
    to: new Date(),
  })

  

  const getAdmWH = async() => {
    const admin = await getAdminClientSide()
    const warehouse = await getWarehouse(admin.id)
    setWarehouseList(warehouse)
    if (admin.role == 'warAdm') {
      setSelectedWH(warehouse[0].warehouseName)
    } else if (admin.role == 'superAdm') {
      setIsSuper(true)
    }
  }

  const getData = async() => {
    if (date && selectedWH) {
      const warehouse = selectedWH == 'All Warehouses'? '' : selectedWH
      const product = await getAllStock(warehouse, page, 10, date)
      setProductQty(product.totalProduct)
      setProductList(product.productList)
      setInventory(product.totalStock)
    }
  }

  useEffect(() => {
    getAdmWH()
  }, [])

  useEffect(() => {
    getData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedWH, open, page, date])
  
  return (
    <div>  
      <div className='flex w-full mb-7 flex-col-reverse xl:flex-row'>
        <div className='flex gap-5 md:gap-10 max-md:flex-wrap'>

          <StatisticsCard 
            title='Total Inventories'
            number={inventory ? inventory : 0}
          />
        </div>
        <div className='flex flex-col w-full items-end mb-7'>
            <p className='text-xl'>Warehouse</p>
            <WarehouseDropdown 
              isSuper={isSuper}
              warehouseList={[...warehouseList]}
              setSelectedWH={setSelectedWH}
              selectedWH={selectedWH}
            />
        </div>
      </div>

      <div>

        <div className='flex items-center flex-wrap gap-y-10 justify-between'>
          <div className='flex gap-2 max-sm:justify-center flex-1 w-full'>

            <div className={`${productList.length > 0 ? "" : 'hidden'}`}>
              <StockDialog 
                selectedWH={selectedWH} 
                setSelectedWH={setSelectedWH} 
                warehouseList={[...warehouseList]} 
                setOpen={setOpen}
                open={open}
              />
            </div>

            <Link href={'/admins/stocks/mutations'} className={productList.length > 0 ? isSuper? 'hidden' : '' : 'hidden'}>
              <Button variant={'outline'} className='flex items-center gap-1 max-sm:text-xs'><p>Manage Mutation</p><PiArrowSquareOut className="text-xl"/> </Button>
            </Link>

          </div>

          <div className='flex gap-2 flex-1 w-full max-sm:justify-between items-center'>
            <div className='flex items-center justify-end gap-2 w-full'>
              <label htmlFor="search" className='max-sm:hidden'><PiMagnifyingGlass className='text-2xl'/></label>
              <Input id='search' type="text" placeholder="Search products" className='w-full sm:max-w-60 min-w-44'/>
            </div>

            <DatePickerWithRange date={date} setDate={setDate}/>
            <PiFileArrowDownFill className='text-5xl'/>
          </div>

        </div>

        <StockTable
            productList={productList}
            page={page}
            productQty={productQty}
            setPage={setPage}
          />
        
      </div>   
    </div>
  )
}
