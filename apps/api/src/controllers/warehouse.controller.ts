import { Request, Response } from 'express';
import prisma from '@/prisma';

export class WarehouseController {
    async getWarehouseList(req: Request, res: Response) {
        try {
            const wareHouseList = await prisma.warehouse.findMany()
            res.status(200).json(wareHouseList);
        } catch (err) {
            res.status(500).json({ error: 'Failed to get warehouse list' });
        }
    }
}
