import React, { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { PiMagnifyingGlass } from 'react-icons/pi'
import { Pagination } from '../pagination'
import OrderTable from './manageOrderList/OrderTable'
import { IOrder } from '@/constants'
import { getAllOrder } from '@/lib/cart'
import { getUserClientSide } from '@/lib/utils'
import SearchOrder from './manageOrderList/SearchOrder'
import { useSearchParams } from 'next/navigation'
import PaginationOrder from './manageOrderList/PaginationOrder'

export default function DisplayOrder() {
    const [orderList, setOrderList] = useState<IOrder[] | null>(null)
    const [totalPages, setTotalPages] = useState(1)
    const [currentPage, setCurrectPage] = useState(1)
    const search = useSearchParams()
    const searchQuery = search ? search.get('q') : null
    const encodedsSearchQuery = encodeURI(searchQuery || '')
    const limitQuery = search ? search.get('limit') : '10';
    const currentQuery = search ? search.get('page') : '1';


    const getOrder = async () => {
        const adminId = '6f09cf0c-2a9b-4550-8d1d-bc02157bdc4d'
        const dataUser = await getUserClientSide()
        if (dataUser) {
            const orders = await getAllOrder(null, dataUser.id, searchQuery, limitQuery, currentQuery)
            setOrderList(orders.orderList)
            setTotalPages(orders.totalPages)
            setCurrectPage(orders.currentPage)
        } else {
            const orders = await getAllOrder(adminId, null, searchQuery, limitQuery, currentQuery)
            setOrderList(orders.orderList)
            setTotalPages(orders.totalPages)
            setCurrectPage(orders.currentPage)
        }
    }

    useEffect(() => {
        getOrder()
    }, [encodedsSearchQuery, limitQuery, currentQuery])
    return (
        <>
            <SearchOrder data={searchQuery || ''} />
            <OrderTable orderList={orderList} setOrderList={setOrderList} />
            <PaginationOrder page={currentPage} totalPages={totalPages} />
        </>
    )
}
