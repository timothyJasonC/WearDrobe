import { Router } from 'express'
import { AccountRouter } from './account.router'
import { UserRouter } from './user.router'
import { CategoryRouter } from './category.router'
import { OrderRouter } from './order.router'
import { WarehouseRouter } from './warehouse.router'
import { ProductRouter } from './product.router'
import { AddressRouter } from './address.router'
import { AdminRouter } from './admin.router'


export class ApiRouter {
    private router: Router
    private accountRouter: AccountRouter
    private userRouter: UserRouter
    private adminRouter : AdminRouter
    private categoryRouter: CategoryRouter 
    private orderRouter: OrderRouter 
    private warehouseRouter: WarehouseRouter 
    private productRouter: ProductRouter 
    private addressRouter: AddressRouter


    constructor() {
        this.router = Router()

        this.accountRouter = new AccountRouter()
        this.userRouter = new UserRouter()
        this.adminRouter = new AdminRouter()
        this.categoryRouter = new CategoryRouter()
        this.orderRouter = new OrderRouter()
        this.warehouseRouter = new WarehouseRouter()
        this.productRouter = new ProductRouter()
        this.addressRouter = new AddressRouter()
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.use('/account', this.accountRouter.getRouter())
        this.router.use('/user', this.userRouter.getRouter())
        this.router.use('/admin', this.adminRouter.getRouter())
        this.router.use('/categories', this.categoryRouter.getRouter())
        this.router.use('/order', this.orderRouter.getRouter())
        this.router.use('/warehouses', this.warehouseRouter.getRouter())
        this.router.use('/products', this.productRouter.getRouter())
        this.router.use('/address', this.addressRouter.getRouter())
    }

    getRouter(): Router {
        return this.router
    }
}

