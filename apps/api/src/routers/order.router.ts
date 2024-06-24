import { OrderController } from "@/controllers/order.controller";
import { Router } from "express";

export class OrderRouter {
    private router: Router
    private orderController: OrderController

    constructor() {
        this.orderController = new OrderController
        this.router = Router()
        this.initializeRoutes()
    }

    private initializeRoutes(): void {
        this.router.post('/cart', this.orderController.addToCart)
        this.router.post('/cart_item', this.orderController.getCartItems)
        this.router.post('/updateCartItem', this.orderController.updateCartItems)
        this.router.post('/deleteCartItem', this.orderController.deleteCartItems)
        this.router.post('/orderDetail', this.orderController.getOrderById)

        this.router.post('/', this.orderController.createOrder)
        this.router.post('/status', this.orderController.checkStatus)
    }

    getRouter() {
        return this.router
    }
}