import { Request, Response } from "express";
import prisma from "@/prisma";
import {v4 as uuidv4} from 'uuid'
enum ProductSize {
    S = 'S',
    M = 'M',
    L = 'L',
    XL = 'XL'
  }


export class StockController {
    async createStock(req: Request, res:Response) {
        try {
            const sizeArray: ProductSize[] = [ProductSize.S, ProductSize.M, ProductSize.L, ProductSize.XL];
            const {warehouseID, type, variant} =req.body
            console.log(req.body);

            const mutationType = type.toUpperCase()
            console.log("MTUATIOASBFJAS", mutationType);
            
            
            await prisma.$transaction(async (tx) => {
                const stockMutation = await tx.stockMutation.create({
                    data: {
                        id: uuidv4(),
                        warehouseID: warehouseID,
                        type: mutationType
                    }
                })
                console.log(stockMutation);
                
                for (let i = 0; i<variant.length; i++) {
                        if (variant[i].size === "All Sizes") {
                        for (let k = 0; k<sizeArray.length; k++) {
                            const currentStock = await tx.warehouseProduct.findFirst({
                                where: {
                                    productVariantID: variant[i].id,
                                    size: sizeArray[k]
                                }
                            })
                            await tx.warehouseProduct.update({
                                where: {
                                    id: currentStock?.id,
                                }, 
                                data:{
                                    stock: Number(mutationType == "RESTOCK" || mutationType === "INBOUND"
                                        ? variant[i].qty + currentStock?.stock 
                                        : currentStock!.stock > variant[i].qty 
                                        ? currentStock!.stock - variant[i].qty
                                        : 0
                                    )
                                }
                            })
                            await tx.stockMutationItem.create({
                                data: {
                                    id: uuidv4(),
                                    quantity: variant[i].qty,
                                    stockMutationID: stockMutation.id,
                                    warehouseProductID: currentStock!.id
                                }
                            })
                        }
                    } else {
                        const currentStock = await tx.warehouseProduct.findFirst({
                            where: {
                                productVariantID: variant[i].id,
                                size: variant[i].size
                            }
                        })        
                                                
                        await tx.warehouseProduct.update({
                            where: {
                                id: currentStock?.id,
                            }, 
                            data: {
                                stock: Number(mutationType == "RESTOCK" || mutationType === "INBOUND"
                                    ? variant[i].qty + currentStock?.stock 
                                    : currentStock!.stock > variant[i].qty 
                                    ? currentStock!.stock - variant[i].qty
                                    : 0
                                )
                            }
                        })
                        
                        await tx.stockMutationItem.create({
                            data: {
                                id: uuidv4(),
                                quantity: variant[i].qty,
                                stockMutationID: stockMutation.id,
                                warehouseProductID: currentStock!.id
                            }
                        })           
                    }
                }
                return res.status(200).send({
                    status: 'ok',
                    message: 'stock updated'
                }) 
            })     
        } catch (error) {
            res.status(400).send({
                status:'error',
                message: error
            })
        }
    }
}