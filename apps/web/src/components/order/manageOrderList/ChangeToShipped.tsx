import { Button } from '@/components/ui/button'
import React from 'react'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { cancelOrder, changeToShipped } from '@/lib/order';
import { IOrder } from '@/constants';
import { getUserClientSide } from '@/lib/utils';

type ChangeOrderPorps = {
    orderId: string
    setOrderList: (value: IOrder[] | null) => void
}
export default function ChangeToShipped({ orderId, setOrderList }: ChangeOrderPorps) {

    const changeStatusToShipped = async () => {
       const adminId = '1'
        const result = await changeToShipped(orderId, adminId)
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
