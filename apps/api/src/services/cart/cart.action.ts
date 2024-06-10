import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient()

export async function getOrCreateCart(userId: string) {
    let cart = await prisma.order.findFirst({
        where: {
            userId,
            paymentStatus: 'PENDING'
        }
    });

    if (!cart) {
        const cartId = uuidv4();
        cart = await prisma.order.create({
            data: {
                id: cartId,
                userId,
                paymentStatus: 'PENDING',
            }
        });
        return { cart, cartId };
    }
    return { cart, cartId: cart.id };
}


export async function addOrUpdateCartItem(orderId: string, variantId: string, quantity: number) {
    let existingCartItem = await prisma.orderItem.findFirst({
        where: {
            orderId,
            productVariantId: variantId
        }
    });

    if (existingCartItem) {
        existingCartItem = await prisma.orderItem.update({
            where: { id: existingCartItem.id },
            data: {
                quantity: existingCartItem.quantity + quantity,
                updatedAt: new Date()
            }
        });
    } else {
        const orderItemId = uuidv4();
        existingCartItem = await prisma.orderItem.create({
            data: {
                id: orderItemId,
                orderId,
                productVariantId: variantId,
                quantity,
                price: 100000,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        });
    }
    return existingCartItem;
}

export async function getCartItemsWithTotal(cartId: string) {
    const cartItems = await prisma.orderItem.findMany({
        where: {
            orderId: cartId
        },
        select: {
            quantity: true,
            price: true
        }
    });

    const totalAmount = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);

    const updateAmount = await prisma.order.update({
        where: { id: cartId },
        data: {
            totalAmount: totalAmount
        }
    })
    return { items: cartItems, updateAmount };
}

export async function getNewCartItem(itemId: string) {
    const items = await prisma.orderItem.findUnique({
        where: { id: itemId },
        include: {
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
        }
    })

    return { items: items }
}