import { MutationStatus, MutationTypes, PrismaClient, ProductSize } from "@prisma/client";
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient()

async function getWarehouseProductId(warehouseID: string, productVariantID: string, size: string) {
    const warehouseProduct = await prisma.warehouseProduct.findFirst({
        where: {
            warehouseID,
            productVariantID,
            size: size as ProductSize
        },
        select: {
            id: true
        }
    });

    return warehouseProduct ? warehouseProduct.id : null;
}

export async function createMutation(warehouseID: string, associatedWarehouseID: string, type: string, status: string) {
    const stockMutation = await prisma.stockMutation.create({
        data: {
            id: uuidv4(),
            warehouseID,
            associatedWarehouseID,
            type: type as MutationTypes,
            status: status as MutationStatus,
            createdAt: new Date(),
        }
    });
    return stockMutation.id!
}

export async function createMutationItem(stockMutationID: string, quantity: number, warehouseId: string, productVariantId: string, size: string) {
    const warehouse = await getWarehouseProductId(warehouseId!, productVariantId!, size!)
    await prisma.stockMutationItem.create({
        data: {
            id: uuidv4(),
            quantity,
            warehouseProductID: warehouse!,
            stockMutationID
        }
    })
}

export async function reduceStockWarehouse( warehouseID: string, productVariantID: string, size: string, quantity: number) {
    await prisma.warehouseProduct.updateMany({
        where: {
            warehouseID,
            productVariantID,
            size: size as ProductSize
        },
        data: {
            stock: {
                decrement: quantity
            }
        }
    })
}

export async function addStockWarehouse( warehouseID: string, productVariantID: string, size: string, quantity: number) {
    await prisma.warehouseProduct.updateMany({
        where: {
            warehouseID,
            productVariantID,
            size: size as ProductSize
        },
        data: {
            stock: {
                increment: quantity
            }
        }
    })
}