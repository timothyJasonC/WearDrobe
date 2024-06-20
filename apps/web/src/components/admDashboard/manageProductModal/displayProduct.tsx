'use client'

import React, { useEffect, useState } from 'react'
import { ProdTable } from './prodTable'
import { PaginationTemplate } from '@/components/pagination'
import { Input } from "@/components/ui/input"
import { PiMagnifyingGlass } from "react-icons/pi";
import { getProduct } from '@/app/action'
import { IProduct, IProductList } from '@/constants'

export const AdminProductDisplay = ({productList}:IProductList) => {
	const [product, setProduct] = useState<IProduct[]>(productList)

	const getProductList = async() => {
		const data = await getProduct()
		
		setProduct(data.productList)
	}

	useEffect(() => {
		getProductList()
	}, [])
	
	return (
		<div>
			<div className='flex items-center justify-end gap-2'>
			<label htmlFor="search"><PiMagnifyingGlass className='text-2xl'/></label>
			<Input id='search' type="text" placeholder="Search products" className='max-w-60'/>
			</div>
			<ProdTable 
			productList={product}
			action={getProductList}
			/>
			<PaginationTemplate />
		</div>
	)
}
