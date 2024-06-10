import { addOrUpdateCartItem, getCartItemsWithTotal, getNewCartItem, getOrCreateCart } from "@/services/cart/cart.action";
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient()

export class OrderController {

    async addToCart(req: Request, res: Response) {
        const { userId, variantId, quantity } = req.body

        try {
            const cart = await getOrCreateCart(userId)

            const cartItem = await addOrUpdateCartItem(cart.cart.id, variantId, quantity)

            const totalAmount = await getCartItemsWithTotal(cart.cart.id)

            const items = await getNewCartItem(cartItem.id)

            res.json({ cart, items })
        } catch (error) {
            res.json(error)
        }
    }

    async getCartItems(req: Request, res: Response) {
        try {
            const cart = await prisma.order.findFirst({
                where: {
                    userId: `${req.body.userId}`,
                    status: 'CART',
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
            res.json(cart)
        } catch (error) {
            res.json(error)
        }
    }
}