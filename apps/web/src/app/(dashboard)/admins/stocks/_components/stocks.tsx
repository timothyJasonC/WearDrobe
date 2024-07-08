'use client'
import { getAllStock, getWarehouse } from '@/app/action'
import { StockDialog } from '@/app/(dashboard)/admins/stocks/_components/stocksDialog'
import { StockTable } from '@/app/(dashboard)/admins/stocks/_components/stocksTable'
import { StatisticsCard } from '@/app/(dashboard)/_components/statisticsCard'
import { WarehouseDropdown } from '@/app/(dashboard)/_components/warehouseDropdown'
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
import { SalesPopover } from '../../sales/_components/salesPopover'
import { useDebouncedCallback } from 'use-debounce'
import xlsx, { IContent, IJsonSheet } from "json-as-xlsx";
import { downloadStockToExcel } from '@/lib/xlsx'
import ExcelButton from '@/app/(dashboard)/_components/excelButton'

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
  const [gender, setGender] = useState('All')
  const [type, setType] = useState('All')
  const [category, setCategory] = useState('All')
  const [q, setQ] = useState('')
  const [date, setDate] = useState<DateRange | undefined>({
    from: monthFirstDate(),
    to: new Date(),
  })

  const debounced = useDebouncedCallback(
    (value) => {
        setQ(value);
      },
      500
  )

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
    if (date?.from && date?.to && selectedWH) {
      const warehouse = selectedWH == 'All Warehouses'? '' : selectedWH
      const g = gender == "All" ? '' : gender
      const t = type == "All" ? '' : type
      const c = category == "All" ? '' : category
      const filter = {date, g, t, c, q}
      const res = await getAllStock(warehouse, page, 10, filter)
      console.log(res);
      
      if (res.status == 'ok') {
        setProductQty(res.totalProduct)
        setProductList(res.productList)
        setInventory(res.totalStock)
      }
    }
  }

  useEffect(() => {
    getAdmWH()
  }, [])

  useEffect(() => {
    getData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedWH, page, date, gender, type, category, q])
  
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

        <div className='flex items-center w-full gap-4 flex-wrap gap-y-5 justify-between'>
          <div className='flex gap-2 max-sm:justify-center max-sm:flex-wrap sm:flex-1 max-sm:w-full'>
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
              <Button variant={'outline'} className='flex items-center gap-1 max-sm:text-xs'>
                <p className='sm:hidden'>Mutation</p>
                <p className='max-sm:hidden'>Manage Mutation</p>
              <PiArrowSquareOut className="text-xl"/> </Button>
            </Link>
            <ExcelButton func={() => downloadStockToExcel(productList, selectedWH)} />

          </div>

          <div className='flex flex-1 gap-2 max-sm:justify-between justify-end items-center'>
            <Input id='search' type="text" placeholder="Search products" className='w-full sm:max-w-60 min-w-44' onChange={(e) => debounced(e.target.value)}/>
            <DatePickerWithRange date={date} setDate={setDate}/>
            <SalesPopover gender={gender} type={type} category={category} setGender={setGender} setType={setType} setCategory={setCategory}/>
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
