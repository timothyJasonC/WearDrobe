import { Request, Response } from 'express';
import prisma from '@/prisma';
import { v4 as uuidv4 } from 'uuid';
import { editProduct } from '@/services/product/product.action';

export class ProductController {
    async createProduct(req: Request, res: Response) {
        try {
            const {name, description, price, categoryData, oneSize, colorVariant, thumbnailURL, additionalURL } = req.body
            
            await prisma.$transaction(async (tx)=> {
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
                    await tx.productVariant.create({
                        data: {
                            id: uuidv4(),
                            productID: newProduct.id,
                            color: colorVariant[i].name,
                            HEX: colorVariant[i].code,
                            image: colorVariant[i].variantImageURL  
                        }
                    })
                }
                return res.status(200).send({
                        status: 'ok',
                        message: 'product created'
                })
            })
        } catch (error) {
            res.status(400).send({
                status: 'error',
                message: error
            })
        }
    }

    async getProduct(req: Request, res: Response) {
        try {
            await prisma.$transaction(async (tx)=> {
                const products = await tx.product.findMany({
                    include: {
                        images: true,
                        variants: {
                            include: {
                                warehouseProduct: true
                            }
                        },
                        category: true
                    }
                })
                const productsWithStock = products.map(product => ({
                    ...product,
                    variants: product.variants.map(variant => ({
                      ...variant,
                      totalStock: variant.warehouseProduct.reduce((total, wp) => total + wp.stock, 0)
                    }))
                  }));
            
                  const productList = productsWithStock.map(product => ({
                    ...product,
                    totalStock: product.variants.reduce((total, variant) => {
                      return total + variant.warehouseProduct.reduce((variantTotal, wp) => variantTotal + wp.stock, 0);
                    }, 0)
                  }));
                
                return res.status(200).send({
                    status: 'ok',
                    message: 'product found',
                    productList
                })
            })
        } catch (error) {
            res.status(400).send({
                status: 'error',
                message: error
            })
        }
    }

    async getProductBySlug(req: Request, res: Response) {
        try {
            const {slug} = req.params
            await prisma.$transaction(async (tx)=> {
                const product = await tx.product.findFirst({
                    where: {
                        slug
                    },
                    include: {
                        images: true,
                        variants: {
                            include: {
                                warehouseProduct: true
                            }
                        },
                        category: true
                    }
                })
                
                return res.status(200).send({
                    status: 'ok',
                    message: 'product found',
                    product
                })
            })
        } catch (error) {
            res.status(400).send({
                status: 'error',
                message: error
            })
        } 
    }

    async editProduct(req: Request, res: Response) {
        try {
            await editProduct(req, res);
        } catch (error) {
            res.status(400).send({
                status: 'error',
                message: error
            });
        }
    }

    async deleteProduct(req:Request, res:Response) {
        try {
            const {slug} = req.params
            await prisma.$transaction(async (tx) => {
                await tx.warehouseProduct.deleteMany({
                    where: {
                        productVariant: {
                            product: {
                                slug
                            }
                        }
                    }
                })
                await tx.productVariant.deleteMany({
                    where: {
                        product: {
                            slug
                        }
                    }
                })
                await tx.productImage.deleteMany({
                    where: {
                        product: {
                            slug
                        }
                    }
                })
                await tx.product.delete({
                    where: {
                        slug
                    }
                })
                return res.status(200).send({
                    status: 'ok',
                    message: 'Product deleted.'
                })
            })
        } catch (error) {
            return res.status(400).send({
                status: 'error',
                message: error
            })
        }
    }
}


