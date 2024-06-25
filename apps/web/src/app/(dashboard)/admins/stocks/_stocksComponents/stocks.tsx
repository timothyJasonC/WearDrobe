'use client'
import { getProduct, getWarehouse } from '@/app/action'
import { StockDialog } from '@/app/(dashboard)/_components/manageStocksModal/stocksDialog'
import { StockTable } from '@/app/(dashboard)/_components/manageStocksModal/stocksTable'
import { StatisticsCard } from '@/app/(dashboard)/_components/statisticsCard'
import { WarehouseDropdown } from '@/app/(dashboard)/_components/warehouseDropdown'
import { PaginationTemplate } from '@/components/pagination'
import { Input } from '@/components/ui/input'
import { IProduct, IWarehouse } from '@/constants'
import { getAdminClientSide } from '@/lib/utils'
import React, { useEffect, useState } from 'react'
import { PiMagnifyingGlass } from 'react-icons/pi'



export const Stocks = () => {  
  const [selectedWH, setSelectedWH] = useState('All Warehouses')
  const [warehouseList, setWarehouseList] = useState<IWarehouse[]>([])
  const [productList, setProductList] = useState<IProduct[]>([])
  const [inventory, setInventory] = useState(0)
  const [productQty, setProductQty] = useState(0)
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1)
  const [isSuper, setIsSuper] = useState(false)
  

  const getAdmWH = async() => {
    const admin = await getAdminClientSide()
    const warehouse = await getWarehouse(admin.id)
    setWarehouseList(warehouse)
    if (admin.role == 'warAdm') {
      setSelectedWH(warehouse[0].warehouseName)
    }
  }

  const getData = async(wh:string) => {
    const product = await getProduct(wh, page)
    setProductQty(product.totalProduct)
    setProductList(product.productList)
    setInventory(product.totalStock)
  }

  useEffect(() => {
    getAdmWH()
  }, [])

  useEffect(() => {
    getData(selectedWH)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedWH, open, page])
  
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
        <div className='flex items-center justify-between'>
          <div className={`${productList.length > 0 ? "flex" : 'hidden'}`}>
            <StockDialog 
              selectedWH={selectedWH} 
              setSelectedWH={setSelectedWH} 
              warehouseList={[...warehouseList]} 
              setOpen={setOpen}
              open={open}
            />
          </div>
          <div className='flex items-center justify-end gap-2'>
            <label htmlFor="search"><PiMagnifyingGlass className='text-2xl'/></label>
            <Input id='search' type="text" placeholder="Search products" className='max-w-60'/>
          </div>
        </div>
        <StockTable
          productList={productList}
          warehouseList={[...warehouseList]}
          setSelectedWH={setSelectedWH}
          selectedWH={selectedWH}
        />
        <PaginationTemplate
        setPage={setPage}
        page={page}
        productQty={productQty}
        />
      </div>   
    </div>
  )
}
