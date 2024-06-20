import { addOrUpdateCartItem, deleteCart, deleteCartItem, getCartItem, getCartItemsWithTotal, getNewCartItem, getOrCreateCart, updateCartItem, updateToOrder } from "@/services/cart/cart.action";
import { failedOrder, getOrderById, getPaymentLink, successOrder } from "@/services/order/order.action";
import { Request, Response } from "express";

export class OrderController {

    async addToCart(req: Request, res: Response) {
        const { userId, variantId, quantity } = req.body

        try {
            const cart = await getOrCreateCart(userId)

            await addOrUpdateCartItem(cart.cart.id, variantId, quantity)

            await getCartItemsWithTotal(cart.cart.id)

            const items = await getCartItem(userId)

            res.json(items)
        } catch (error) {
            res.json(error)
        }
    }

    async getCartItems(req: Request, res: Response) {
        try {
            const cart = await getCartItem(req.body.userId)
            if (cart !== null) {
                res.json(cart)
            } else {
                res.json({ message: 'no cart' })
            }
        } catch (error) {
            res.json(error)
        }
    }

    async updateCartItems(req: Request, res: Response) {
        const { itemId, newQuantity, userId } = req.body;

        try {
            await updateCartItem(itemId, newQuantity);

            const cart = await getCartItem(userId)
            res.status(200).json(cart);
        } catch (error) {
            res.status(500).json({ error: 'Failed to update cart item' });
        }
    }

    async deleteCartItems(req: Request, res: Response) {
        const { itemId, userId } = req.body;
        try {
            await deleteCartItem(itemId)
            const cart = await getCartItem(userId)
            if (Array.isArray(cart?.items) && cart.items.length === 0) {
                await deleteCart(cart.id)
                res.json({ message: 'cart deleted' })
            } else {
                res.status(200).json(cart);
            }
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete cart item' });
        }
    }

    async getOrderById(req: Request, res: Response) {
        try {
            const { orderId } = req.body
            const cart = await getOrderById(orderId)
            if (cart !== null) {
                res.json(cart)
            } else {
                res.json({ message: 'no cart' })
            }
        } catch (error) {
            res.json(error)
        }
    }

    async createOrder(req: Request, res: Response) {
        try {
            const { orderId, shippingCost, subTotal, userId } = req.body
            const order = await updateToOrder(orderId, shippingCost, subTotal)
            if (order) {
                let data = {
                    transaction_details: {
                        order_id: order.id,
                        gross_amount: subTotal + shippingCost,
                    },
                    expiry: {
                        unit: 'minutes',
                        duration: 10
                    }
                }
                const paymentLink = await getPaymentLink(data)
                res.json(paymentLink)
            }
        } catch (err) {
            res.json(err)
        }
    }

    async checkStatus(req: Request, res: Response) {
        try {
            if (req.body.transaction_status === 'settlement') {
                const updateOrder = await successOrder(req.body.order_id)
                console.log(updateOrder);
            } else if (req.body.transaction_status === 'failed') {
                const updateOrder = await failedOrder(req.body.order_id);
                console.log(updateOrder);
            } else {
                console.log(`Transaction status is ${req.body.transaction_status}, no action taken.`);
            }
        } catch (err) {
            res.json(err)
        }
    }

}