import { Router } from 'express'
import { OrderRouter } from './order.router'

export class ApiRouter {
    private orderRouter: OrderRouter
    private router: Router

    constructor() {
        this.router = Router()
        this.orderRouter = new OrderRouter()
        this.initializeRoutes()
    }

    private initializeRoutes(): void {
        this.router.use('/order', this.orderRouter.getRouter())
    }

    getRouter() {
        return this.router
    }
}