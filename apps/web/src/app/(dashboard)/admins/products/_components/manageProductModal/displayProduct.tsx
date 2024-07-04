import React, { useEffect, useState } from 'react'
import { ProdTable } from './prodTable'
import { PaginationTemplate } from '@/components/pagination'
import { Input } from "@/components/ui/input"
import { PiMagnifyingGlass } from "react-icons/pi";
import { getProduct } from '@/app/action'
import { IProduct, IProductList } from '@/constants'

interface IAdminProduct {
	page: number
	setPage: React.Dispatch<React.SetStateAction<number>>
	getData: () => void
	productList: IProduct[]
	productQty: number
	isSuper: boolean
}

export const AdminProductDisplay = ({page, setPage, getData,productList, productQty,isSuper}:IAdminProduct) => {
	
	return (
		<div className='w-full'>
			<div className='flex items-center w-full justify-end gap-2'>
				<label htmlFor="search"><PiMagnifyingGlass className='text-2xl'/></label>
				<Input id='search' type="text" placeholder="Search products" className='max-w-60'/>
			</div>
			<div className=''>
				<div className=''>
				<ProdTable 
					productList={productList}
					action={getData}
					isSuper={isSuper}
					page={page}
				/>
				</div>
			</div>
			<PaginationTemplate
			setPage={setPage}
			page={page}
			productQty={productQty}
			/>
		</div>
	)
}
