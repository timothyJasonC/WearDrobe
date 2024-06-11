import {Router} from 'express'
import { CategoryRouter } from './category.controller'
import { OrderRouter } from './order.router'


export class ApiRouter {
    private router: Router
    private categoryRouter: CategoryRouter 
    private orderRouter: OrderRouter 


    constructor() {
        this.router = Router()
        this.categoryRouter = new CategoryRouter()
        this.orderRouter = new OrderRouter()
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.use('/categories', this.categoryRouter.getRouter())
        this.router.use('/order', this.orderRouter.getRouter())
    }

    getRouter(): Router {
        return this.router
    }
}

