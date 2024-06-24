'use client'

import React, { useEffect, useState } from 'react'
import { ProdTable } from './prodTable'
import { PaginationTemplate } from '@/components/pagination'
import { Input } from "@/components/ui/input"
import { PiMagnifyingGlass } from "react-icons/pi";
import { getProduct } from '@/app/action'
import { IProduct } from '@/constants'

export const AdminProductDisplay = () => {
	const [productList, setProductList] = useState<IProduct[]>([])

	const getProductList = async () => {
		const data = await getProduct()

		setProductList(data.productList)
	}

	useEffect(() => {
		getProductList()
	}, [])

	return (
		<div>
			<div className='flex items-center justify-end gap-2'>
				<label htmlFor="search"><PiMagnifyingGlass className='text-2xl' /></label>
				<Input id='search' type="text" placeholder="Search products" className='max-w-60' />
			</div>
			<ProdTable
				productList={productList}
				action={getProductList}
			/>
			<PaginationTemplate />
		</div>
	)
}
