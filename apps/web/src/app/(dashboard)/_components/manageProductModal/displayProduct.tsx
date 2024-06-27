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
		<div>
			<div className='flex items-center justify-end gap-2'>
				<label htmlFor="search"><PiMagnifyingGlass className='text-2xl'/></label>
				<Input id='search' type="text" placeholder="Search products" className='max-w-60'/>
			</div>
			<ProdTable 
			productList={productList}
			action={getData}
			isSuper={isSuper}
			/>
			<PaginationTemplate
			setPage={setPage}
			page={page}
			productQty={productQty}
			/>
		</div>
	)
}
