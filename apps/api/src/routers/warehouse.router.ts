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
        this.router.get('/all', this.warehouseController.getWarehouses)
        this.router.get('/', this.warehouseController.getWarehouseList)
        this.router.get('/available-warehouses', this.warehouseController.getAvailableWarehouse)
        this.router.get('/assigned-warehouse/:id', this.warehouseController.getWarehouseByAdminId)
        this.router.post('/', this.warehouseController.createWarehouse)
        this.router.get('/', this.warehouseController.getAllWarehouses)
        this.router.get('/:id', this.warehouseController.getWarehouseList)
        this.router.patch('/assign-admin-to-warehouse', this.warehouseController.assignAdminToWarehouse)
        this.router.patch('/dismiss-admin-from-warehouse', this.warehouseController.dissmissAdminFromWarehouse)
        this.router.delete('/deactivate-warehouse/:id', this.warehouseController.deactivateWarehouse)
        this.router.patch('/reactivate-warehouse/:id', this.warehouseController.reactivateWarehouse)
    }

    getRouter() : Router{
        return this.router
    }
}