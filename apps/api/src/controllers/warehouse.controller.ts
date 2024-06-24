import { Request, Response } from 'express';
import prisma from '@/prisma';

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
}
