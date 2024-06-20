import { AddressController } from "@/controllers/address.controller";
import { Router } from "express";

export class AddressRouter {
    private router: Router
    private addressController: AddressController

    constructor() {
        this.addressController = new AddressController
        this.router = Router()
        this.initializeRoutes()
    }

    private initializeRoutes(): void {
        this.router.post('/', this.addressController.addAddress)
        this.router.post('/addressList', this.addressController.getAddressList)
        this.router.get('/getProvinces', this.addressController.getProvinces)
        this.router.post('/getCities', this.addressController.getCitites)
        this.router.post('/getClossestWarehouse', this.addressController.getClossestWarehouse)
        this.router.post('/getShippingCost', this.addressController.getShippingCost)

    }

    getRouter() {
        return this.router
    }
}