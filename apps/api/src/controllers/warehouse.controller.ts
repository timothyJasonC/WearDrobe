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

    async getAvailableWarehouse(req: Request, res: Response) {
        try {
            const warehouses = await prisma.warehouse.findMany({ where: { adminID: null } });
            if (!warehouses) return serverResponse(res, 404, 'error', 'All warehouses are already occupied!')
            serverResponse(res, 200, 'ok', 'Warehouses found!', warehouses)
            
        } catch (error: any) {
            return serverResponse(res, 400, 'error', error)
        }
    }

    async createWarehouse(req: Request, res: Response) {
        try {

            const { selectedCity, address, warehouseName, assignedAdmin } = req.body
            const city = await fetch(`https://api.rajaongkir.com/starter/city?id=${selectedCity}`, {
                method: 'GET',
                headers: { key: `${process.env.NEXT_PUBLIC_RAJA_ONGKIR_API_KEY}` }
            });
            const data = await city.json()
            const result = data.rajaongkir.results

            const newWarehouse = await prisma.warehouse.create({
                data: {
                    warehouseName: warehouseName,
                    coordinate: `${address}, ${result.type} ${result.city_name}, ${result.province}, Indonesia`,
                    address: address,
                    city_id: result.city_id,
                    province_id: result.province_id,
                    province: result.province,
                    type: result.type,
                    city_name: result.city_name,
                    postal_code: result.postal_code,
                    adminID: assignedAdmin ? assignedAdmin : null, 
                }
            })

            serverResponse(res, 200, 'ok', 'Warehouse successfully created!')
        } catch (error: any) {
            return serverResponse(res, 400, 'error', error)
        }
    }

    async getWarehouseByAdminId(req: Request, res: Response) {
        try {
            const warehouse = await prisma.warehouse.findFirst({ where: { adminID: req.params.id }});
            if (!warehouse) return serverResponse(res, 404, 'error', 'Admin has not been assigned to any warehouse')
            serverResponse(res, 200, 'ok', 'Assigned warehouse found!', warehouse)
        } catch (error: any) {
            return serverResponse(res, 400, 'error', error)
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

    async getWarehouses(req: Request, res: Response) {
        try {
            const warehouses = await prisma.warehouse.findMany();
            if (!warehouses) return serverResponse(res, 404, 'error', 'Warehouse not found')
            serverResponse(res, 200, 'ok', 'Warehouses found!', warehouses)
        } catch (error: any) {
            return serverResponse(res, 400, 'error', error)
        }
    }
}
