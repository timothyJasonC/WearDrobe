import { Button } from '@/components/ui/button'
import React from 'react'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { cancelOrder, changeToShipped } from '@/lib/order';
import { IOrder } from '@/constants';
import { getAdminClientSide, getUserClientSide } from '@/lib/utils';
import { DateRange } from 'react-day-picker';

type ChangeOrderPorps = {
    orderId: string
    setOrderList: (value: IOrder[] | null) => void
    currentPage: string | null
    date: DateRange

}
export default function ChangeToShipped({ orderId, setOrderList, currentPage, date }: ChangeOrderPorps) {

    const changeStatusToShipped = async () => {
        const admin = await getAdminClientSide()
        const result = await changeToShipped(orderId, admin.id, currentPage, date)
        setOrderList(result)
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className='rounded-full w-full px-4' variant={'default'} size={"sm"}>Shipped</Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="w-96">
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone and the status of this order will change to shipped so the warehouse admin should send the user orders.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={changeStatusToShipped}>Shipped</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
