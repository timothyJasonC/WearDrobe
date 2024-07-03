import { WarehouseController } from '@/controllers/warehouse.controller';
import {Router} from 'express'

export class WarehouseRouter {
    private router: Router
    private warehouseController: WarehouseController

    constructor() {
        this.warehouseController = new WarehouseController()
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.get('/', this.warehouseController.getWarehouseList)
        this.router.get('/available-warehouses', this.warehouseController.getAvailableWarehouse)
        this.router.get('/assigned-warehouse/:id', this.warehouseController.getWarehouseByAdminId)
        this.router.post('/', this.warehouseController.createWarehouse)
    }

    getRouter() : Router{
        return this.router
    }
}