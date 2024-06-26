import React, { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { PiMagnifyingGlass } from 'react-icons/pi'
import { Pagination } from '../pagination'
import OrderTable from './manageOrderList/OrderTable'
import { IOrder } from '@/constants'
import { getOrderByAdminId } from '@/lib/cart'
import { getUserClientSide } from '@/lib/utils'

export default function DisplayOrder() {
    const [orderList, setOrderList] = useState<IOrder[] | null>(null)

    const getOrder = async () => {
        const adminId = '1'
        const dataUser = await getUserClientSide()
        if (dataUser) {
            const orders = await getOrderByAdminId(null, dataUser.id)
            setOrderList(orders)
        } else {
            const orders = await getOrderByAdminId(adminId, null)
            setOrderList(orders)
        }
    }

    useEffect(() => {
        getOrder()
    }, [])
    return (
        <>
            <div className='flex items-center justify-end gap-2' >
                <label htmlFor="search"><PiMagnifyingGlass className='text-2xl' /></label>
                <Input id='search' type="text" placeholder="Search Order" className='max-w-60' />
            </div >
            <OrderTable orderList={orderList} setOrderList={setOrderList} />
            PaginationTemplate/>
        </>
    )
}
