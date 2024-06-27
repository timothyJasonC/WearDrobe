import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient()


const orderDetail = {
    items: {
        select: {
            id: true,
            orderId: true,
            productVariantId: true,
            size: true,
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
}

export async function getUserById(userId: string) {
    const user = await prisma.user.findUnique({
        where: { id: userId }
    })
    return user
}

export async function getOrderById(orderId: string) {
    const cart = await prisma.order.findFirst({
        where: {
            id: orderId
        },
        include: orderDetail,
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

async function updateSuccessStock(items: any, warehouseID: string) {
    for (const item of items) {
        const { productVariantId, quantity, size } = item;

        await prisma.warehouseProduct.updateMany({
            where: { productVariantID: productVariantId, size, warehouseID },
            data: {
                stock: {
                    increment: -quantity
                }
            }
        });
    }
    return
}



export async function successOrder(orderId: string) {
    const updateOrder = await prisma.order.update({
        where: {
            id: orderId
        },
        data: {
            paymentStatus: "COMPLETED",
            status: "PROCESSED",
        },
        include: orderDetail,
    })
    await updateSuccessStock(updateOrder.items, updateOrder.warehouseId!)
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

async function getAllOrder(warehouseId: string | null, query: string, page: string, limit: string, warehouse: string) {
    if (warehouseId === 'none') return null;
    const order = await prisma.order.findMany({
        orderBy: {
            createdAt: 'asc',
        },
        where: warehouseId ? {
            AND: [
                { warehouseId: warehouseId }
            ],
            OR: [
                { id: { contains: query } },
            ]

        } : {
            AND: [
                { warehouseId: warehouse }
            ],
            OR: [
                { id: { contains: query } },
            ]
        },
        skip: (+page - 1) * +limit,
        take: +limit
    });
    return order
}

async function totalTransactionByAdmin(warehouseId: string | null, query: string) {
    if (warehouseId === 'none') return null;
    const order = await prisma.order.count({
        where: warehouseId ? {
            AND: [
                { warehouseId: warehouseId }
            ],
            OR: [
                { id: { contains: query } },
            ]

        } : {
            OR: [
                { id: { contains: query } },
            ]
        }
    });
    return order
}

export async function getOrderByUser(userId: string, query: string, page: string, limit: string) {
    const orders = await prisma.order.findMany({
        orderBy: {
            createdAt: 'asc',
        },
        where: {
            AND: [
                { userId: userId }
            ],
            OR: [
                { id: { contains: query } },
            ]
        },
        skip: (+page - 1) * +limit,
        take: +limit
    })
    return orders
}

export async function getTotalOrderByUser(userId: string, query: string) {
    const orders = await prisma.order.count({
        where: {
            AND: [
                { userId: userId }
            ],
            OR: [
                { id: { contains: query } },
            ]
        }
    })
    return orders
}

export async function getTotalOrderByAdmin(adminId: string, query: string) {
    const admin = await prisma.admin.findUnique({
        where: { id: adminId },
        include: {
            Warehouse: true
        }
    })
    if (admin?.role === 'superAdm') {
        const totalPages = await totalTransactionByAdmin(null, query)
        return totalPages
    }
    if (admin?.role === 'warAdm') {
        const totalPages = await totalTransactionByAdmin(admin.Warehouse?.id ? admin.Warehouse.id : 'none', query)
        return totalPages
    }
}

export async function getOrderByAdmin(adminId: string, query: string, page: string, limit: string, warehouse: string) {
    const admin = await prisma.admin.findUnique({
        where: { id: adminId },
        include: {
            Warehouse: true
        }
    })
    if (admin?.role === 'superAdm') {
        const orders = await getAllOrder(null, query, page, limit, warehouse)
        return orders
    }
    if (admin?.role === 'warAdm') {
        const orders = await getAllOrder(admin.Warehouse?.id ? admin.Warehouse.id : 'none', query, page, limit, warehouse)
        return orders
    }
}

async function updateCanceledStock(items: any, warehouseID: string) {
    for (const item of items) {
        const { productVariantId, quantity, size } = item;

        await prisma.warehouseProduct.updateMany({
            where: { productVariantID: productVariantId, size, warehouseID },
            data: {
                stock: {
                    increment: quantity
                }
            }
        });
    }
    return
}

export async function cancelOrder(orderId: string) {
    try {
        const updateOrder = await prisma.order.update({
            where: { id: orderId },
            data: {
                status: "CANCELLED"
            },
            include: {
                items: {
                    select: {
                        quantity: true,
                        productVariantId: true,
                        size: true
                    }
                }
            }
        })
        await updateCanceledStock(updateOrder.items, updateOrder.warehouseId!)
        return updateOrder
    } catch (err) {
        return null
    }
}

export async function updateShipped(orderId: string) {
    try {
        const updateOrder = await prisma.order.update({
            where: { id: orderId },
            data: {
                status: "SHIPPED"
            }
        })
        return updateOrder
    } catch (err) {
        return null
    }
}