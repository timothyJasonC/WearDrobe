import { Button } from '@/components/ui/button'
import React from 'react'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { IOrder } from '@/constants';
import { getUserClientSide } from '@/lib/utils';
import { confirmOrder } from '@/lib/order';

type ConfirmShippedPorps = {
    orderId: string
    setOrderList: (value: IOrder[] | null) => void
    currentPage: string | null
}

export default function ConfirmShipped({ orderId, setOrderList, currentPage }: ConfirmShippedPorps) {
    const handleConfirmShipped = async () => {
        const dataUser = await getUserClientSide()
        if (dataUser) {
            const res = await confirmOrder(orderId, dataUser.id, currentPage)
            setOrderList(res)
        }
    };
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className='rounded-full w-full px-4' size={"sm"}>Konfirmasi Penerimaan Barang</Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="w-96">
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone and the status of this order will be set to completed.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => { handleConfirmShipped() }}>Confirm Order</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
