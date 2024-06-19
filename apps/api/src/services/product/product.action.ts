import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function editProduct(req: Request, res: Response) {
    const { slug } = req.params;
    const { name, description, onesize, price, thumbnailURL, additionalURL, additionalDelete, colorVariantEdit, colorVariantNew, colorVariantDelete, categoryData } = req.body;
    
    await prisma.$transaction(async (tx) => {
        const productCategory = await tx.productCategory.findFirst({
            where: {
                gender: categoryData.gender.toUpperCase(),
                type: categoryData.type.toUpperCase(),
                category: categoryData.category
            }
        });
        
        const product = await tx.product.update({
            data: {
                name,
                description,
                oneSize: onesize,
                price,
                slug: name.toLowerCase().replaceAll(" ", "-"),
                categoryID: productCategory!.id
            },
            where: {
                slug
            }
        });

        if (thumbnailURL) {
            await tx.product.update({
                data: {
                    thumbnailURL
                },
                where: {
                    slug
                }
            });
        }

        if (additionalURL.length > 0) {
            for (let i = 0; i < additionalURL.length; i++) {
                await tx.productImage.create({
                    data: {
                        id: uuidv4(),
                        image: additionalURL[i],
                        productID: product.id
                    }
                });
            }
        }

        if (additionalDelete.length > 0) {
            for (let i = 0; i < additionalDelete.length; i++) {
                await tx.productImage.delete({
                    where: {
                        id: additionalDelete[i]
                    }
                });
            }
        }

        if (colorVariantEdit.length > 0) {
            for (let i = 0; i < colorVariantEdit.length; i++) {
                await tx.productVariant.update({
                    where: {
                        id: colorVariantEdit[i].id
                    },
                    data: {
                        color: colorVariantEdit[i].name,
                        HEX: colorVariantEdit[i].code,
                        image: colorVariantEdit[i].variantImageURL
                    }
                });
            }
        }

        if (colorVariantNew.length > 0) {
            for (let i = 0; i < colorVariantNew.length; i++) {
                await tx.productVariant.create({
                    data: {
                        id: uuidv4(),
                        productID: product.id,
                        color: colorVariantNew[i].name,
                        HEX: colorVariantNew[i].code,
                        image: colorVariantNew[i].variantImageURL
                    }
                });
            }
        }

        if (colorVariantDelete.length > 0) {
            for (let i = 0; i < colorVariantDelete.length; i++) {
                await tx.warehouseProduct.deleteMany({
                    where: {
                        productVariantID: colorVariantDelete[i]
                    }
                });
                await tx.productVariant.delete({
                    where: {
                        id: colorVariantDelete[i]
                    }
                });
            }
        }

        return res.status(200).send({
            status: 'ok',
            message: 'product updated'
        });
    });
}
