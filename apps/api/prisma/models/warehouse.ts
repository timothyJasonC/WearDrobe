import { ProductSize } from "@prisma/client"

export async function listWarehouse() {
    return [
        {
            id: 'warehouse-id-1',
            warehouseName: 'Main Warehouse',
            coordinate: '37.7749,-122.4194',
            address: '456 Warehouse St',
            city_id: 'city-id-1',
            province_id: 'province-id-1',
            province: 'California',
            type: 'storage',
            city_name: 'San Francisco',
            postal_code: '94103',
            createdAt: new Date(),
            adminID: 'admin.id', // change this
        },
    ]
}

export async function listWarehouseProduct() {
    return [
        {
            id: 'warehouse-product-id-1',
            warehouseID: 'warehouse.id',
            productVariantID: 'productVariant.id',
            size: ProductSize.M,
            stock: 10,
        },
    ]
}