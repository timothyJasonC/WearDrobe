import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient()

export async function getOrderById(orderId: string) {
    const cart = await prisma.order.findFirst({
        where: {
            id: orderId
        },
        include: {
            items: {
                select: {
                    id: true,
                    orderId: true,
                    productVariantId: true,
                    quantity: true,
                    price: true,
                    createdAt: true,
                    updatedAt: true,
                    productVariant: {
                        select: {
                            color: true,
                            image: true,
                            product: {
                                select: {
                                    name: true
                                }
                            }
                        },
                    },
                },
            },
        },
    });
    return cart
}

export async function getPaymentLink(data: any) {
    const secret = process.env.MIDTRANS_PUBLIC_SECRET as string
    const encededSecret = Buffer.from(secret).toString('base64')
    const basicAuth = `Basic ${encededSecret}`
    const response = await fetch(`${process.env.MIDTRANS_PUBLIC_API}`, {
        method: 'POST',
        headers: {
            'Access-Control-Allow-Origin': 'true',
            "Accept": "application/json",
            "Content-Type": "application/json",
            'Authorization': basicAuth
        },
        body: JSON.stringify(data)
    })
    const paymentLink = await response.json()
    return paymentLink
}

export async function successOrder(orderId: string) {
    const updateOrder = await prisma.order.update({
        where: {
            id: orderId
        },
        data: {
            paymentStatus: "COMPLETED",
            status: "PROCESSED",
        }
    })
    return updateOrder
}

export async function failedOrder(orderId: string) {
    const updateOrder = await prisma.order.update({
        where: {
            id: orderId
        },
        data: {
            id: uuidv4(),
            paymentStatus: "FAILED",
            status: "CART",
        }
    })
    return updateOrder
}