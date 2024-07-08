import { Button } from '@/components/ui/button'
import React from 'react'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { cancelOrder } from '@/lib/order';
import { IOrder } from '@/constants';
import { getAdminClientSide, getUserClientSide } from '@/lib/utils';
import { DateRange } from 'react-day-picker';

type CancelOrderPorps = {
    orderId: string
    setOrderList: (value: IOrder[] | null) => void
    currentPage: string | null
    date: DateRange
}

export default function CancelOrder({ orderId, setOrderList, currentPage, date }: CancelOrderPorps) {
    const handleDelete = async () => {
        const dataUser = await getUserClientSide()
        const admin = await getAdminClientSide()
        if (dataUser) {
            const res = await cancelOrder(orderId, null, dataUser.id, currentPage, date)
            setOrderList(res)
        } else {
            const res = await cancelOrder(orderId, admin.id, null, currentPage, date)
            setOrderList(res)
        }
    };
    return (
        <div>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button className='rounded-full w-full px-4' variant={'destructive'} size={"sm"}>cancel</Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="w-96">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone and the money will be refund to user automaticaly.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => { handleDelete() }}>Cancel Order</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}
