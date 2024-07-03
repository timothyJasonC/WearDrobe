import { Request, Response } from 'express';
import prisma from '@/prisma';
import { serverResponse } from '@/helpers/apiResponse';

export class WarehouseController {
    async getWarehouseList(req: Request, res: Response) {
        try {
            const {id} = req.params
            const adminRole = await prisma.admin.findFirst({
                where: {
                    id
                }
            })
            let wareHouseList
            if (adminRole?.role == 'superAdm') {
                wareHouseList = await prisma.warehouse.findMany()
            } else if (adminRole?.role == 'warAdm') {
                wareHouseList = await prisma.warehouse.findMany({
                    where: {
                        adminID: id
                    }
                })
            }
            res.status(200).json(wareHouseList)
        } catch (err) {
            res.status(500).json({ error: 'Failed to get warehouse list' });
        }
    }

    async getAllWarehouses(req: Request, res: Response) {
        try {
            const {filter} = req.query
            let warehouseList
            if (filter) {
                 warehouseList = await prisma.warehouse.findMany({
                    where: {
                        warehouseName: {
                            not: String(filter)
                        }
                    }
                })
            } else {
                warehouseList = await prisma.warehouse.findMany()
            }
            serverResponse(res, 200, 'ok', 'warehouse found', warehouseList)
        } catch (error:any) {
            serverResponse(res, 400, 'error', error)
        }
    }
}
