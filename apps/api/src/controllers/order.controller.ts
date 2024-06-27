import { addOrUpdateCartItem, deleteCart, deleteCartItem, getCartItem, getCartItemsWithTotal, getNewCartItem, getOrCreateCart, updateCartItem, updateToOrder } from "@/services/cart/cart.action";
import { cancelOrder, failedOrder, getOrderByAdmin, getOrderById, getOrderByUser, getPaymentLink, getTotalOrderByAdmin, getTotalOrderByUser, getUserById, successOrder, updateShipped } from "@/services/order/order.action";
import { Request, Response } from "express";
import fs from "fs"
import handlebars from "handlebars"
import path from "path";
import { transporter } from '@/helpers/nodemailer';
import { getWarehouseById } from "@/services/address/address.action";
import { generateInvoicePdf } from "@/helpers/pdf";

export class OrderController {

    async addToCart(req: Request, res: Response) {
        const { userId, variantId, quantity, color, size } = req.body

        try {
            const cart = await getOrCreateCart(userId)

            await addOrUpdateCartItem(cart.id, variantId, color, size, quantity)

            await getCartItemsWithTotal(cart.id)

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
            const { orderId, shippingCost, subTotal, warehouseId } = req.body
            const order = await updateToOrder(orderId, shippingCost, subTotal, warehouseId)
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
                const user = await getUserById(updateOrder.userId)
                const warehouse = await getWarehouseById(updateOrder.warehouseId!)

                const templatePath = path.join(__dirname, "../templates", "invoice.html")
                const templateSource = fs.readFileSync(templatePath, 'utf-8')
                const compiledTemplate = handlebars.compile(templateSource)

                const inputData = {
                    name: user?.username,
                    status: updateOrder.status,
                    paymentStatus: updateOrder.paymentStatus,
                    orderItem: updateOrder.items,
                    totalAmount: updateOrder.totalAmount,
                    createdAt: updateOrder.createdAt,
                    warehouse: warehouse?.warehouseName
                }

                const html = compiledTemplate(inputData)

                const pdf = await generateInvoicePdf(inputData)
                await transporter.sendMail({
                    from: process.env.MAIL_USER,
                    to: user?.email,
                    subject: `Your Order Details on WearDrobe`,
                    html,
                    attachments: [{ path: pdf }]

                })

            } else if (req.body.transaction_status === 'failed') {
                await failedOrder(req.body.order_id);
            } else {
                return
            }
        } catch (err) {
            res.json(err)
        }
    }

    async getOrderByAdmin(req: Request, res: Response) {
        try {
            const { adminId, userId } = req.body
            let { q: query, page, limit } = req.query;

            if (typeof query !== "string") throw 'Invalid request'
            if (typeof page !== "string" || isNaN(+page)) page = '1';
            if (typeof limit !== "string" || isNaN(+limit)) limit = '10'


            if (userId) {
                const orderList = await getOrderByUser(userId, query, page, limit)
                const totalOrders = await getTotalOrderByUser(userId, query)
                const totalPages = Math.ceil(totalOrders / +limit)
                const currentPage = +page
                res.json({ orderList, totalPages, currentPage })
            }
            if (adminId) {
                const orderList = await getOrderByAdmin(adminId, query, page, limit)
                const totalOrders = await getTotalOrderByAdmin(adminId, query)
                const totalPages = Math.ceil(totalOrders! / +limit)
                const currentPage = +page
                res.json({ orderList, totalPages, currentPage })
            }
        } catch (err) {
            res.json(err)
        }
    }

    async cancelOrder(req: Request, res: Response) {
        try {
            const { orderId, adminId, userId } = req.body
            let { q: query, page, limit } = req.query;

            if (typeof query !== "string") throw 'Invalid request'
            if (typeof page !== "string" || isNaN(+page)) page = '1';
            if (typeof limit !== "string" || isNaN(+limit)) limit = '10'
            const cancel = await cancelOrder(orderId)

            if (cancel) {
                if (adminId) {
                    const orderList = await getOrderByAdmin(adminId, query, page, limit)
                    res.json(orderList)
                }
                if (userId) {
                    const orderList = await getOrderByUser(userId, query, page, limit)
                    res.json(orderList)
                }
            }
        } catch (err) {
            res.json(err)
        }
    }

    async changeToShipped(req: Request, res: Response) {
        try {
            const { orderId, adminId } = req.body
            let { q: query, page, limit } = req.query;
            if (typeof query !== "string") throw 'Invalid request'
            if (typeof page !== "string" || isNaN(+page)) page = '1';
            if (typeof limit !== "string" || isNaN(+limit)) limit = '10'

            const updateToShipped = await updateShipped(orderId)

            if (updateToShipped) {
                const orderList = await getOrderByAdmin(adminId, query, page, limit)
                res.json(orderList)
            }
        } catch (err) {
            res.json(err)
        }
    }

}