import {Router} from 'express'
import { CategoryRouter } from './category.controller'
import { OrderRouter } from './order.router'
import { WarehouseRouter } from './warehouse.controller'
import { ProductRouter } from './product.router'
import { StockRouter } from './stock.router'


export class ApiRouter {
    private router: Router
    private categoryRouter: CategoryRouter 
    private orderRouter: OrderRouter 
    private warehouseRouter: WarehouseRouter 
    private productRouter: ProductRouter 
    private stockRouter: StockRouter 


    constructor() {
        this.router = Router()
        this.categoryRouter = new CategoryRouter()
        this.orderRouter = new OrderRouter()
        this.warehouseRouter = new WarehouseRouter()
        this.productRouter = new ProductRouter()
        this.stockRouter = new StockRouter()
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.use('/categories', this.categoryRouter.getRouter())
        this.router.use('/order', this.orderRouter.getRouter())
        this.router.use('/warehouses', this.warehouseRouter.getRouter())
        this.router.use('/products', this.productRouter.getRouter())
        this.router.use('/stocks', this.stockRouter.getRouter())
    }

    getRouter(): Router {
        return this.router
    }
}

