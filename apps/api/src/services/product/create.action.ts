import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { PrismaClient } from "@prisma/client";
import { serverResponse } from '@/helpers/apiResponse';

const prisma = new PrismaClient()

enum ProductSize {
    S = 'S',
    M = 'M',
    L = 'L',
    XL = 'XL'
  }
export async function createProduct(req: Request, res: Response) {
    await prisma.$transaction(async (tx)=> {
        
        const {name, description, price, categoryData, oneSize, colorVariant, thumbnailURL, additionalURL } = req.body
        const sizeArray: ProductSize[] = [ProductSize.S, ProductSize.M, ProductSize.L, ProductSize.XL];
        const symbolRegex = /[^a-zA-Z0-9\s-]/;
        if (name.length > 30 || name.length < 2 || name.trim().length === 0 || symbolRegex.test(name)) throw "Invalid name input."
        if (description.length > 500 || description.length < 15 || description.trim().length === 0) throw "Invalid description input."
        if (isNaN(price) || price < 1000) throw "Invalid price input."
        if (!categoryData) throw "Invalid category input."
        if (!colorVariant) throw "Invalid color variant input."
        if (!thumbnailURL) throw "Invalid thumbnail input."

        const wareHouseList = await tx.warehouse.findMany()
        const validateName = await tx.product.findFirst({where: { name }})
        if (validateName) throw "product name already exists"
        const productCategory = await tx.productCategory.findFirst({
            where: {
                gender: categoryData.gender.toUpperCase(),
                type: categoryData.type.toUpperCase(),
                category: categoryData.category
            }
        })
        const newProduct = await tx.product.create({
            data: { id: uuidv4(), name, slug: name.toLowerCase().replaceAll(" ", "-"), description, price, categoryID: productCategory!.id, oneSize: oneSize, thumbnailURL }
        })
        for (let i=0; i<additionalURL.length; i++) {
            await tx.productImage.create({ data: { id: uuidv4(), productID: newProduct.id, image: additionalURL[i] } })
        }
        for (let i=0; i<colorVariant.length; i++) {
            const variant = await tx.productVariant.create({ 
                data: { id: uuidv4(), productID: newProduct.id, color: colorVariant[i].name, 
                HEX: colorVariant[i].code, image: colorVariant[i].variantImageURL }
            })
            for (let k = 0; k<wareHouseList.length; k++) {
                if (oneSize) {
                    await tx.warehouseProduct.create({
                        data: { id: uuidv4(), warehouseID: wareHouseList[k].id, productVariantID: variant.id, size: 'ONESIZE', stock: 0 }
                    })
                } else {
                    for (let s = 0; s<sizeArray.length; s++) {
                        await tx.warehouseProduct.create({
                            data: {id: uuidv4(), warehouseID: wareHouseList[k].id, productVariantID: variant.id, size: sizeArray[s], stock: 0 }
                        })
                    }
                }
            }
        }
        return serverResponse(res, 200, 'ok', 'Product successfully created.')
    })
}