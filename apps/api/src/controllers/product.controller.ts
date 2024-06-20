import { Request, Response } from 'express';
import prisma from '@/prisma';
import { v4 as uuidv4 } from 'uuid';
import { editProduct } from '@/services/product/edit.action';
import { createProduct } from '@/services/product/create.action';

export class ProductController {
    async createProduct(req: Request, res: Response) {
        try {
            await createProduct(req, res)
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


