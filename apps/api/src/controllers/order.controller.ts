import { addOrUpdateCartItem, deleteCart, deleteCartItem, getCartItem, getCartItemsWithTotal, getNewCartItem, getOrCreateCart, updateCartItem } from "@/services/cart/cart.action";
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient()

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
            if (cart?.items.length == 0) {
                await deleteCart(cart.id)
                res.json({message: 'cart deleted'})
            } else {
                res.status(200).json(cart);
            }
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete cart item' });
        }

    }
}