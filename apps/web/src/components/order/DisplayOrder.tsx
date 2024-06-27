import React, { useEffect, useState } from 'react'
import OrderTable from './manageOrderList/OrderTable'
import { IOrder } from '@/constants'
import { getAllOrder } from '@/lib/cart'
import { formUrlQuery, getAdminClientSide, getUserClientSide, removeKeysFromQuery } from '@/lib/utils'
import SearchOrder from './manageOrderList/SearchOrder'
import { useRouter, useSearchParams } from 'next/navigation'
import PaginationOrder from './manageOrderList/PaginationOrder'

type DisplayOrderProps = {
    warehouse?: string
}

export default function DisplayOrder({ warehouse }: DisplayOrderProps) {
    const [orderList, setOrderList] = useState<IOrder[] | null>(null)
    const [totalPages, setTotalPages] = useState(1)
    const [currentPage, setCurrectPage] = useState(1)
    const search = useSearchParams()
    const searchQuery = search ? search.get('q') : null
    const warehouseQuery = search ? search.get('w') : null
    const encodedsSearchQuery = encodeURI(searchQuery || '')
    const encodedsWarehouseQuery = encodeURI(warehouseQuery || '')
    const limitQuery = search ? search.get('limit') : '10';
    const currentQuery = search ? search.get('page') : '1';
    const router = useRouter()

    const warehouseData = async (warehouse: string) => {
        let newUrl = ''
        if (warehouse && warehouse !== 'All Warehouses') {
            newUrl = formUrlQuery({
                params: search.toString(),
                key: 'w',
                value: warehouse
            })
        } else {
            newUrl = removeKeysFromQuery({
                params: search.toString(),
                keysToRemove: ['w']
            })
        }
        router.push(newUrl, { scroll: false });

    }

    useEffect(() => {
        if (warehouse) {
            warehouseData(warehouse)
        }
    }, [warehouse, router, search])



    const getOrder = async () => {
        const dataUser = await getUserClientSide()
        const dataAdmin = await getAdminClientSide()
        if (dataUser) {
            const orders = await getAllOrder(null, dataUser.id, searchQuery, limitQuery, currentQuery, warehouseQuery)
            setOrderList(orders.orderList)
            setTotalPages(orders.totalPages)
            setCurrectPage(orders.currentPage)
        } else {
            const orders = await getAllOrder(dataAdmin.id, null, searchQuery, limitQuery, currentQuery, warehouseQuery)
            setOrderList(orders.orderList)
            setTotalPages(orders.totalPages)
            setCurrectPage(orders.currentPage)
        }
    }

    useEffect(() => {
        getOrder()
    }, [encodedsSearchQuery, limitQuery, currentQuery, encodedsWarehouseQuery])
    return (
        <>
            <SearchOrder data={searchQuery || ''} />
            <OrderTable orderList={orderList} setOrderList={setOrderList} />
            <PaginationOrder page={currentPage} totalPages={totalPages} />
        </>
    )
}
