import { Router } from 'express'
import { AccountRouter } from './account.router'
import { UserRouter } from './user.router'
import { CategoryRouter } from './category.controller'
import { OrderRouter } from './order.router'


export class ApiRouter {
    private router: Router
    private accountRouter: AccountRouter
    private userRouter: UserRouter
    private categoryRouter: CategoryRouter 
    private orderRouter: OrderRouter 


    constructor() {
        this.router = Router()

        this.accountRouter = new AccountRouter()
        this.userRouter = new UserRouter()
        this.categoryRouter = new CategoryRouter()
        this.orderRouter = new OrderRouter()
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.use('/account', this.accountRouter.getRouter())
        this.router.use('/user', this.userRouter.getRouter())
        this.router.use('/categories', this.categoryRouter.getRouter())
        this.router.use('/order', this.orderRouter.getRouter())
    }

    getRouter(): Router {
        return this.router
    }
}

