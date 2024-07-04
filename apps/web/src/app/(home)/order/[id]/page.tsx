"use client"

import Loading from "@/app/Loading";
import { IOrder } from "@/constants";
import { getOrderById } from "@/lib/cart";
import { formatDateTime, formatToIDR, getAdminClientSide, getUserClientSide } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import NotFound from "@/components/notFound";

type OrderDetailProps = {
    params: {
        id: string
    }
}

export default function Page({ params: { id } }: OrderDetailProps) {
    const [order, setOrder] = useState<IOrder | null>(null)
    const [address, setAddress] = useState<string | null>(null)
    const [warehouseLoc, setWarehouseLoc] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [shipingCost, setShippingCost] = useState<number>(0)
    const [notFound, setNotFound] = useState(false)
    const router = useRouter()
    const shipping = order?.shippingMethod?.split(',')

    const validateUser = useCallback(async () => {
        const order = await getOrderById(id)
        if (order.message) { setIsLoading(false); setNotFound(true) }
        const user = await getUserClientSide()
        const admin = await getAdminClientSide()
        if (!user && !admin) router.push('/auth')
        if (user && user.id !== order.cart?.userId && !admin) setNotFound(true)
    }, [id, router])

    const getOrder = useCallback(async () => {
        const order = await getOrderById(id)
        if (order.message) { setIsLoading(false); setNotFound(true) }
        setOrder(order.cart)
        setAddress(order.address.coordinate)
        setWarehouseLoc(order.warehouse.coordinate)
        setShippingCost(order.shippingCost)
        setIsLoading(false)
    }, [id, router])

    useEffect(() => {
        validateUser()
        getOrder()
    }, [validateUser, getOrder])

    if (isLoading) {
        return <Loading />
    }

    if (notFound) {
        return <NotFound />
    }
    return (
        <section className="bg-gray-200 min-h-screen py-10 md:px-0 px-2">
            <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
                <div className="flex flex-col gap-2">
                    <span className={`font-light md:text-4xl sm:text-2xl text-lg`}>WearDrobe</span>
                    <div className="w-full h-1 bg-gray-200"></div>
                </div>
                <div className="mt-8 flex flex-col gap-2">
                    <h2 className="text-base font-bold text-center md:text-xl">Detail Order</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 items-center">
                        <div className="flex flex-col gap-2 text-xs md:text-base">
                            <p className="text-gray-600">Payment status : {order?.paymentStatus}</p>
                            <p className="text-gray-600">Current Status : {order?.status}</p>
                            <p className="text-gray-600">Created At : {formatDateTime(new Date(order?.createdAt!)).dateTime}</p>
                            {order?.shippedAt !== null && (
                                <p className="text-gray-600">Shipped At : {formatDateTime(new Date(order?.shippedAt!)).dateTime}</p>
                            )}
                        </div>
                        {shipping !== undefined && (
                            <div className="flex flex-col gap-2 text-xs md:text-base">
                                <p className="text-gray-600">Shipping Courier : {shipping[0].toUpperCase()}</p>
                                <p className="text-gray-600">Shipping Service : {shipping[1]}, ({shipping[2]})</p>
                                <p className="text-gray-600">Estimated Day : {shipping[3]} days </p>
                            </div>
                        )}
                    </div>
                </div>
                <Table className="my-7">
                    <TableCaption>A detail of your order #{order?.id}.</TableCaption>
                    <TableCaption>from : {warehouseLoc} </TableCaption>
                    <TableCaption>to : {address} </TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[200px]">Product Name</TableHead>
                            <TableHead className="text-center">Product Variant</TableHead>
                            <TableHead className="text-center">Size</TableHead>
                            <TableHead className="text-center">Quantity</TableHead>
                            <TableHead className="text-center">Price</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {order?.items && order?.items?.map((item) => (
                            <TableRow className="p-2" key={item.id}>
                                <TableCell className="font-semibold max-w-44">{item.productVariant.product.name}</TableCell>
                                <TableCell className="text-center" >{item.productVariant.color}</TableCell>
                                <TableCell className="text-center">{item.size}</TableCell>
                                <TableCell className="text-center">{item.quantity}</TableCell>
                                <TableCell className="text-center">{formatToIDR(item.price)}</TableCell>
                            </TableRow>
                        ))}
                        <TableRow className="p-2">
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell>Shipping Cost</TableCell>
                            <TableCell>{formatToIDR(shipingCost)}</TableCell>
                        </TableRow>
                        <TableRow className="p-2">
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell>Total</TableCell>
                            <TableCell>{formatToIDR(order?.totalAmount!)}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <div className="mt-8 flex justify-between items-center">
                    <p className="text-gray-600"><strong>Thank you for your order!</strong></p>
                </div>
            </div>
        </section>
    )
}
