import prisma from "@/prisma";
import { createAddress, findClosestWarehouse, getAddressCoordinates, getAddressUserById, getAllWarehouseAddress, getShippingCost, getUserAddressList, getWarehouseByName } from "@/services/address/address.action";
import { Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';

export class AddressController {
    async getProvinces(req: Request, res: Response) {
        try {
            const result = await fetch('https://api.rajaongkir.com/starter/province', {
                method: 'GET',
                headers: { key: `${process.env.NEXT_PUBLIC_RAJA_ONGKIR_API_KEY}` }
            });
            const data = await result.json()
            res.json(data)
        } catch (error) {
            res.json(error)
        }
    }

    async getCitites(req: Request, res: Response) {
        try {
            const { provinceId } = req.body
            const result = await fetch(`https://api.rajaongkir.com/starter/city?province=${provinceId}`, {
                method: 'GET',
                headers: { key: `${process.env.NEXT_PUBLIC_RAJA_ONGKIR_API_KEY}` }
            });
            const data = await result.json()
            res.json(data)
        } catch (error) {
            res.json(error)
        }
    }

    async addAddress(req: Request, res: Response) {
        try {
            const { selectedCity, address, userId } = req.body

            const city = await fetch(`https://api.rajaongkir.com/starter/city?id=${selectedCity}`, {
                method: 'GET',
                headers: { key: `${process.env.NEXT_PUBLIC_RAJA_ONGKIR_API_KEY}` }
            });
            const data = await city.json()
            const result = data.rajaongkir.results
            const addressUser = await createAddress(result, address, userId)
            res.json({ message: 'add address successfull', addressUser })
        } catch (err) {
            res.json(err)
        }
    }

    async getAddressList(req: Request, res: Response) {
        try {
            const { userId } = req.body
            const addressList = await getUserAddressList(userId)
            const sortedAddressList = addressList.sort((a, b) => {
                if (a.mainAddress && !b.mainAddress) {
                    return -1;
                }
                if (!a.mainAddress && b.mainAddress) {
                    return 1;
                }
                return 0;
            })
            res.json(sortedAddressList)
        } catch (err) {
            res.json(err)
        }
    }

    async getClossestWarehouse(req: Request, res: Response) {
        try {
            const { address } = req.body
            const addressUser = await getAddressUserById(address)
            const addressCoordinates = await getAddressCoordinates(`${addressUser?.address}, ${addressUser?.city_name}, ${addressUser?.province}, Indonesia`)
            const allWarehouseAddress = await getAllWarehouseAddress()
            const closestWarehouse = await findClosestWarehouse(addressCoordinates, allWarehouseAddress)
            const warehouseId = Object.keys(closestWarehouse!)
            const warehouse = await getWarehouseByName(warehouseId[0])

            res.json(warehouse)
        } catch (err) {
            res.json(err)
        }
    }

    async getShippingCost(req: Request, res: Response) {
        try {
            const {warehouseId, userAddress, shipping} = req.body
            const data = await getShippingCost(warehouseId, userAddress, shipping)
            res.json(data.rajaongkir.results)
        } catch (err) {
            res.json(err)

        }
    }
}