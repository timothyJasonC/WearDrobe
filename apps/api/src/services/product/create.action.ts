import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { PrismaClient } from "@prisma/client";

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
        const wareHouseList = await tx.warehouse.findMany()
        const validateName = await tx.product.findFirst({
            where: {
                name
            }
        })
        if (validateName) throw "product name already exists"
        const productCategory = await tx.productCategory.findFirst({
            where: {
                gender: categoryData.gender.toUpperCase(),
                type: categoryData.type.toUpperCase(),
                category: categoryData.category
            }
        })
        const newProduct = await tx.product.create({
            data: {
                id: uuidv4(),
                name,
                slug: name.toLowerCase().replaceAll(" ", "-"),
                description,
                price,
                categoryID: productCategory!.id,
                oneSize: oneSize,
                thumbnailURL
            }
        })
        for (let i=0; i<additionalURL.length; i++) {
            await tx.productImage.create({
                data: {
                    id: uuidv4(),
                    productID: newProduct.id,
                    image: additionalURL[i]
                } 
            })
        }
        for (let i=0; i<colorVariant.length; i++) {
            const variant = await tx.productVariant.create({
                data: {
                    id: uuidv4(),
                    productID: newProduct.id,
                    color: colorVariant[i].name,
                    HEX: colorVariant[i].code,
                    image: colorVariant[i].variantImageURL  
                }
            })
            for (let k = 0; k<wareHouseList.length; k++) {
                if (oneSize) {
                    await tx.warehouseProduct.create({
                        data: {
                            id: uuidv4(),
                            warehouseID: wareHouseList[k].id,
                            productVariantID: variant.id,
                            size: 'ONESIZE',
                            stock: 0
                        }
                    })
                } else {
                    for (let s = 0; s<sizeArray.length; s++) {
                        await tx.warehouseProduct.create({
                            data: {
                                id: uuidv4(),
                                warehouseID: wareHouseList[k].id,
                                productVariantID: variant.id,
                                size: sizeArray[s],
                                stock: 0
                            }
                        })
                    }
                }
            }
        }
        return res.status(200).send({
                status: 'ok',
                message: 'product created'
        })
    })
}