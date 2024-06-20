import { StatisticsCard } from '@/components/admDashboard/statisticsCard'
import { WarehouseDropdown } from '@/components/admDashboard/warehouseDropdown'
import React from 'react'
import { getCategory, getProduct } from '@/app/action'
import { ManageCategoryDialog } from '@/components/admDashboard/manageCategoryModal/categoryDialog'
import { CreateProductDialog } from '@/components/admDashboard/manageProductModal/createProductDialog'
import { AdminProductDisplay } from '@/components/admDashboard/manageProductModal/displayProduct'



export default async function Products() {
  const category = await getCategory("", "")
  const product = await getProduct()
  const productList = await product.productList
  
  return (
    <div className='flex flex-col w-full min-h-screen py-10 px-10 md:px-20'>
      
      <div className='flex w-full mb-7 flex-col-reverse xl:flex-row'>
        <div className='flex gap-5 md:gap-10 max-md:flex-wrap'>
          <StatisticsCard 
            title='Products'
            number={productList.length}
            modalElement={<CreateProductDialog />}
          />
          <StatisticsCard 
            title='Categories'
            number={category.category.length}
            modalElement={<ManageCategoryDialog />}
          />
        </div>
        <div className='flex flex-col w-full items-end mb-7'>
            <p className='text-xl'>Warehouse</p>
            <WarehouseDropdown />
        </div>
      </div>

      <div>
        <AdminProductDisplay 
        productList={productList}
        />
      </div>   
    </div>
  )
}
