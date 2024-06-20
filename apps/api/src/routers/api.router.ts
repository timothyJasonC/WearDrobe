import {Router} from 'express'
import { CategoryRouter } from './category.controller'
import { OrderRouter } from './order.router'
import { AddressRouter } from './address.router'


export class ApiRouter {
    private router: Router
    private categoryRouter: CategoryRouter 
    private orderRouter: OrderRouter 
    private addressRouter: AddressRouter


    constructor() {
        this.router = Router()
        this.categoryRouter = new CategoryRouter()
        this.orderRouter = new OrderRouter()
        this.addressRouter = new AddressRouter()
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.use('/categories', this.categoryRouter.getRouter())
        this.router.use('/order', this.orderRouter.getRouter())
        this.router.use('/address', this.addressRouter.getRouter())
    }

    getRouter(): Router {
        return this.router
    }
}

