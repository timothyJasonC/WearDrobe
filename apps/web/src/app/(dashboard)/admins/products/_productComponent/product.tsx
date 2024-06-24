'use client'
import { StatisticsCard } from '@/components/admDashboard/statisticsCard'
import { WarehouseDropdown } from '@/components/admDashboard/warehouseDropdown'
import React, { useEffect, useState } from 'react'
import { getCategory, getProduct, getWarehouse } from '@/app/action'
import { ManageCategoryDialog } from '@/components/admDashboard/manageCategoryModal/categoryDialog'
import { CreateProductDialog } from '@/components/admDashboard/manageProductModal/createProductDialog'
import { AdminProductDisplay } from '@/components/admDashboard/manageProductModal/displayProduct'
import { IProduct, IWarehouse } from '@/constants'



export  function Products() {
const [selectedWH, setSelectedWH] = useState('All Warehouses')
const [warehouseList, setWarehouseList] = useState<IWarehouse[]>([])
const [productList, setProductList] = useState<IProduct[]>([])
const [open, setOpen] = useState(false);
const [categoryLength, setCategoryLength] = useState(0) 
const [productQty, setProductQty] = useState(0) 
const [page, setPage] = useState(1)


const getData = async(wh:string) => {
    const warehouse = await getWarehouse()
    const product = await getProduct(wh, page)
    const category = await getCategory("", "")
    setWarehouseList(warehouse)
    setProductList(product.productList)
    setProductQty(product.totalProduct)
    setCategoryLength(category.category.length)
  }

  useEffect(() => {
    getData(selectedWH)
  }, [selectedWH, open, page])


  
  return (
    <div className='flex flex-col w-full py-10 px-10 md:px-20'>
      
      <div className='flex w-full mb-7 flex-col-reverse xl:flex-row'>
        <div className='flex gap-5 md:gap-10 max-md:flex-wrap'>
          <StatisticsCard 
            title='Products'
            number={productQty ? productQty : 0}
            modalElement={<CreateProductDialog setOpen={setOpen} open={open}/>}
          />
          <StatisticsCard 
            title='Categories'
            number={categoryLength}
            modalElement={<ManageCategoryDialog />}
          />
        </div>
        <div className='flex flex-col w-full items-end mb-7'>
            <p className='text-xl'>Warehouse</p>
            <WarehouseDropdown 
                selectedWH={selectedWH}
                setSelectedWH={setSelectedWH}
                warehouseList={warehouseList}
            />
        </div>
      </div>

      <div>
        <AdminProductDisplay 
        page={page}
        setPage={setPage}
        productList={productList}
        getData={() => getData(selectedWH)}
        productQty={productQty}
        />
      </div>   
    </div>
  )
}
