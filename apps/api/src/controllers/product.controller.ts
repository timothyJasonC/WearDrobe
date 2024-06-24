import { Request, Response } from 'express';
import prisma from '@/prisma';
import { v4 as uuidv4 } from 'uuid';
import { editProduct } from '@/services/product/edit.action';
import { createProduct } from '@/services/product/create.action';
import { serverResponse } from '@/helpers/apiResponse';
import { ProductGender } from '@prisma/client';

enum ProductSize { S = 'S', M = 'M', L = 'L', XL = 'XL' }

export class ProductController {
    async createProduct(req: Request, res: Response) {
        try {
            await createProduct(req, res)
        } catch (error:any) {
            serverResponse(res, 400, 'error', error)
        }
    }

    async getProductName(req: Request, res: Response) {
        try {
            const productNameList = await prisma.product.findMany({
                select: {
                    name: true
                }
            })
            serverResponse(res, 200, 'ok', 'product name found.', productNameList)
        } catch (error:any) {
            serverResponse(res, 400, 'error', error)
        }
    }

    async getProduct(req: Request, res: Response) {
        try {
            const {w, s, p} = req.query
            await prisma.$transaction(async (tx)=> {
                const totalProduct = await tx.product.count()
                if (w === 'All Warehouses' || !w) {
                    if (s) {
                        const products = await tx.product.findMany({
                            include: {
                                images: true,
                                variants: {
                                    include: {
                                        warehouseProduct: {
                                            select: {
                                                warehouseID: true,
                                                id: true,
                                                size: true,
                                                stock: true,
                                                updatedAt: true,
                                            },orderBy: {
                                                updatedAt: 'desc'
                                            }, where: {
                                                size:  String(s).toUpperCase() as ProductSize,
                                                isDelete: false
                                            }
                                        }
                                    }, where: {
                                        isDeleted: false
                                    }
                                },
                                category: true,
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
    
                        const totalStock = await tx.warehouseProduct.aggregate({
                            _sum: {
                                stock: true
                            }
                        })
                        return res.status(200).send({
                            status: 'ok',
                            message: 'product found',
                            productList,
                            totalStock: totalStock._sum.stock,
                            totalProduct
                        })
                    } else {
                        const products = await tx.product.findMany({
                            include: {
                                images: true,
                                variants: {
                                    include: {
                                        warehouseProduct: {
                                            select: {
                                                warehouseID: true,
                                                id: true,
                                                size: true,
                                                stock: true,
                                                updatedAt: true,
                                            },orderBy: {
                                                updatedAt: 'desc'
                                            }
                                        }
                                    },where: {
                                        isDeleted: false
                                    }
                                },
                                category: true,
                            },
                            take: 10,
                            skip: (Number(p) - 1) * 10
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
    
                        const totalStock = await tx.warehouseProduct.aggregate({
                            _sum: {
                                stock: true
                            },
                        })
                        
                        return res.status(200).send({
                            status: 'ok',
                            message: 'product found',
                            productList,
                            totalStock: totalStock._sum.stock,
                            totalProduct
                        })
                    }
                } else {
                    const products = await tx.product.findMany({
                        include: {
                            images: true,
                            variants: {
                                include: {
                                    warehouseProduct: {
                                        where: {
                                            warehouse: {
                                                warehouseName: String(w)
                                            }, isDelete: false
                                        },
                                        select: {
                                            warehouseID: true,
                                            id: true,
                                            size: true,
                                            stock: true,
                                            updatedAt: true,
                                        },orderBy: {
                                            updatedAt: 'desc'
                                        }
                                    }
                                }, where: {
                                    isDeleted: false
                                }
                            },
                            category: true
                        },
                        take: 10,
                        skip: (Number(p) - 1) * 10
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

                    const totalStock = await tx.warehouseProduct.aggregate({
                        _sum: {
                            stock: true
                        },
                        where: {
                            warehouse: {
                                warehouseName: String(w)
                            }
                        }
                    })
                    return res.status(200).send({
                        status: 'ok',
                        message: 'product found',
                        productList,
                        totalStock: totalStock._sum.stock,
                        totalProduct
                    })                   
                }
            })
        } catch (error:any) {
            serverResponse(res, 400, 'error', error)
        }
    }

    async getProductBySlug(req: Request, res: Response) {
        try {
            const {slug} = req.params
            const {w, s} = req.query
            await prisma.$transaction(async (tx)=> {
                if (w === "All Warehouses" || w === '') {
                    if (s) {
                        const products = await tx.product.findFirst({
                            where: {
                                slug
                            },
                            include: {
                                images: true,
                                variants: {
                                    include: {
                                        warehouseProduct: {
                                            select: {
                                                warehouseID: true,
                                                id: true,
                                                size: true,
                                                stock: true,
                                                updatedAt: true,
                                            },orderBy: {
                                                updatedAt: 'desc'
                                            }, where: {
                                                size: String(s).toUpperCase() as ProductSize,
                                                isDelete: false
                                            }
                                        }
                                    },
                                    where: {
                                        isDeleted: false
                                    }
                                },
                                category: true
                            }
                        })
                        const productsWithStock = {
                            ...products,
                            variants: products!.variants.map((variant:any) => ({
                            ...variant,
                            totalStock: variant.warehouseProduct.reduce((total:any, wp:any) => total + wp.stock, 0)
                            }))
                        }
                    
                        const productList = {
                            ...productsWithStock,
                            totalStock: products!.variants.reduce((total:any, variant:any) => {
                            return total + variant.warehouseProduct.reduce((variantTotal:any, wp:any) => variantTotal + wp.stock, 0);
                            }, 0)
                        }
                        
                        return res.status(200).send({
                            status: 'ok',
                            message: 'product found',
                            productList
                        })
                    } else {
                        const products = await tx.product.findFirst({
                            where: {
                                slug
                            },
                            include: {
                                images: true,
                                variants: {
                                    include: {
                                        warehouseProduct: {
                                            select: {
                                                warehouseID: true,
                                                id: true,
                                                size: true,
                                                stock: true,
                                                updatedAt: true,
                                            },orderBy: {
                                                updatedAt: 'desc'
                                            },where: {
                                                isDelete: false
                                            }
                                        }
                                    }, where: {
                                        isDeleted: false
                                    }
                                },
                                category: true
                            }
                        })
                        const productsWithStock = {
                            ...products,
                            variants: products!.variants.map((variant:any) => ({
                            ...variant,
                            totalStock: variant.warehouseProduct.reduce((total:any, wp:any) => total + wp.stock, 0)
                            }))
                        }
                    
                        const productList = {
                            ...productsWithStock,
                            totalStock: products!.variants.reduce((total:any, variant:any) => {
                            return total + variant.warehouseProduct.reduce((variantTotal:any, wp:any) => variantTotal + wp.stock, 0);
                            }, 0)
                        }
                        
                        return res.status(200).send({
                            status: 'ok',
                            message: 'product found',
                            productList
                        })
                    }
                } else {
                    if (s) {
                        const products = await tx.product.findFirst({
                            where: {
                                slug,
                            },
                            include: {
                                images: true,
                               variants: {
                                    include: {
                                        warehouseProduct: {
                                            where: {
                                                warehouse: {
                                                    warehouseName: String(w)
                                                }, 
                                                size: String(s).toUpperCase() as ProductSize,
                                                isDelete: false

                                            },
                                            select: {
                                                warehouseID: true,
                                                id: true,
                                                size: true,
                                                stock: true,
                                                updatedAt: true,
                                            },orderBy: {
                                                updatedAt: 'desc'
                                            }
                                        }
                                    }, where: {
                                        isDeleted: false
                                    }
                                },
                                category: true
                            }
                        })
                        const productsWithStock = {
                            ...products,
                            variants: products!.variants.map((variant:any) => ({
                            ...variant,
                            totalStock: variant.warehouseProduct.reduce((total:any, wp:any) => total + wp.stock, 0)
                            }))
                        }
                    
                        const productList = {
                            ...productsWithStock,
                            totalStock: products!.variants.reduce((total:any, variant:any) => {
                            return total + variant.warehouseProduct.reduce((variantTotal:any, wp:any) => variantTotal + wp.stock, 0);
                            }, 0)
                        }
                        
                        return res.status(200).send({
                            status: 'ok',
                            message: 'product found',
                            productList
                        })
                    } else {
                        const products = await tx.product.findFirst({
                            where: {
                                slug,
                            },
                            include: {
                                images: true,
                               variants: {
                                    include: {
                                        warehouseProduct: {
                                            where: {
                                                warehouse: {
                                                    warehouseName: String(w),
                                                }, isDelete: false
                                            },
                                            select: {
                                                warehouseID: true,
                                                id: true,
                                                size: true,
                                                stock: true,
                                                updatedAt: true,
                                            },orderBy: {
                                                updatedAt: 'desc'
                                            }
                                        }
                                    }, where: {
                                        isDeleted: false
                                    }
                                },
                                category: true
                            }
                        })
                        const productsWithStock = {
                            ...products,
                            variants: products!.variants.map((variant:any) => ({
                            ...variant,
                            totalStock: variant.warehouseProduct.reduce((total:any, wp:any) => total + wp.stock, 0)
                            }))
                        }
                    
                        const productList = {
                            ...productsWithStock,
                            totalStock: products!.variants.reduce((total:any, variant:any) => {
                            return total + variant.warehouseProduct.reduce((variantTotal:any, wp:any) => variantTotal + wp.stock, 0);
                            }, 0)
                        }
                        return serverResponse(res, 200, 'ok', 'product found', productList)
                    }
                }
            })
        } catch (error:any) {
            serverResponse(res, 400, 'error', error)
        } 
    }

    async editProduct(req: Request, res: Response) {
        try {
            await editProduct(req, res);
        } catch (error:any) {
            serverResponse(res, 400, 'error', error)
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
        } catch (error:any) {
            serverResponse(res, 400, 'error', error)
        }
    }

    async getProductByCategory(req: Request, res:Response) {
        try {
            const {g, c} = req.query
            console.log(g, c);
            
                const products = await prisma.product.findMany({
                    where: {
                        category: {
                            AND: [
                                {OR: [
                                    {gender:{equals:String(g).toUpperCase() as ProductGender}},
                                    {gender:{equals:'UNISEX'}}
                                ]},
                                {slug:{equals:String(c)}}
                            ]
                        },
                    }, 
                    include: {
                        images: true,
                        variants: {
                            include: {
                                warehouseProduct: {
                                    select: {
                                        stock: true,
                                    }, where: {
                                        isDelete: false
                                    }
                                }
                            },
                            where: {
                                isDeleted: false
                            }
                        },
                        category: true
                    }, 
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

                const totalProduct = await prisma.product.count({
                    where: {
                        category: {
                            AND: [
                                {OR: [
                                    {gender:{equals:String(g).toUpperCase() as ProductGender}},
                                    {gender:{equals:'UNISEX'}}
                                ]},
                                {slug:{equals:String(c)}}
                            ]
                        },
                    }, 
                })
                return res.status(200).send({
                    status: 'ok',
                    message: 'product found',
                    productList,
                    totalProduct,
                    
                })
        } catch (error:any) {
            serverResponse(res, 400, 'error', error)
        }
    }
}


