import { Request, Response } from "express";
import prisma from "@/prisma";
import {v4 as uuidv4} from 'uuid'
import { serverResponse } from "@/helpers/apiResponse";
import { MutationTypes, ProductSize } from "@prisma/client";



export class StockController {
    async createStock(req: Request, res:Response) {
        enum ProductSize {S = 'S', M = 'M', L = 'L', XL = 'XL'}
        try {
            const sizeArray: ProductSize[] = [ProductSize.S, ProductSize.M, ProductSize.L, ProductSize.XL];
            const {warehouseName, type, variant} =req.body
            if (!warehouseName || !type || !variant) throw "Invalid stock data input."
            if (["RESTOCK", "TRANSFER", "RESTOCK", "REMOVE", "TRANSACTION", "INBOUND", "DELETE"].includes(type) == false) throw "Invalid stock data input."
            const mutationType = type.toUpperCase()            
            await prisma.$transaction(async (tx) => {
                if (warehouseName === "All Warehouses" || warehouseName==='') {
                    const wareHouseList = await tx.warehouse.findMany()
                    for (let w = 0; w < wareHouseList.length; w++) {
                        const stockMutation = await tx.stockMutation.create({
                            data: {
                                id: uuidv4(),
                                warehouseID: wareHouseList[w].id,
                                type: mutationType
                            }
                        })
                        for (let i = 0; i<variant.length; i++) {
                            if (variant[i].size === "All Sizes") {
                                for (let k = 0; k<sizeArray.length; k++) {
                                    const currentStock = await tx.warehouseProduct.findFirst({
                                        where: {
                                            productVariantID: variant[i].id,
                                            size: sizeArray[k],
                                            warehouseID: stockMutation.warehouseID
                                        }, include: {
                                            productVariant: {
                                                include: {
                                                    product: {
                                                        select:{
                                                            name:true
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    })
                                    if (!currentStock) throw "Product variant not found."
                                    if (currentStock!.stock < variant[i].qty && type == "REMOVE") throw `Failed to remove, insufficient stock at ${wareHouseList[w].warehouseName} (${currentStock!.stock}, ${currentStock?.productVariant.color}, ${sizeArray[k]})` 
                                    const newStockLog = await tx.stockMutationItem.create({
                                        data: {
                                            id: uuidv4(),
                                            quantity: variant[i].qty,
                                            stockMutationID: stockMutation.id,
                                            warehouseProductID: currentStock!.id
                                        }
                                    })
                                    await tx.warehouseProduct.update({
                                        where: {
                                            id: currentStock?.id,
                                        }, 
                                        data:{
                                            stock: Number(mutationType == "RESTOCK" || mutationType === "INBOUND"
                                                ? newStockLog.quantity + currentStock!.stock 
                                                : currentStock!.stock > newStockLog.quantity
                                                ? currentStock!.stock - newStockLog.quantity
                                                : 0
                                            ),
                                            updatedAt: new Date()
                                        }
                                    })
                                }
                            } else {
                                const currentStock = await tx.warehouseProduct.findFirst({
                                    where: {
                                        productVariantID: variant[i].id,
                                        size: variant[i].size.toUpperCase(),
                                        warehouseID: stockMutation.warehouseID
                                    }, include: {
                                        productVariant: {
                                            include: {
                                                product: {
                                                    select:{
                                                        name:true
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }) 
                                if (!currentStock) throw "Product variant not found."
                                if (currentStock!.stock < variant[i].qty && type == "REMOVE") throw `Failed to remove, insufficient stock at  ${wareHouseList[w].warehouseName} (${currentStock!.stock}, ${currentStock?.productVariant.color}, ${variant[i].size.toUpperCase()}`       
                                const newStockLog = await tx.stockMutationItem.create({
                                    data: {
                                        id: uuidv4(),
                                        quantity: variant[i].qty,
                                        stockMutationID: stockMutation.id,
                                        warehouseProductID: currentStock!.id
                                    }
                                })                                                          
                                await tx.warehouseProduct.update({
                                    where: {
                                        id: currentStock?.id,
                                    }, 
                                    data: {
                                        stock: Number(mutationType == "RESTOCK" || mutationType === "INBOUND"
                                            ? newStockLog.quantity + currentStock!.stock 
                                            : currentStock!.stock > newStockLog.quantity
                                            ? currentStock!.stock - newStockLog.quantity
                                            : 0
                                        )
                                    }
                                })                              
                            }
                        }
                    }
                } else {
                    const wareHouseList = await tx.warehouse.findFirst({
                        where: {
                            warehouseName
                        }
                    })
                    if (!wareHouseList) throw "Invalid warehouse."
                    if (!wareHouseList) throw "Warehouse not found."                    
                    const stockMutation = await tx.stockMutation.create({
                        data: {
                            id: uuidv4(),
                            warehouseID: wareHouseList!.id,
                            type: mutationType
                        }
                    })
                    for (let i = 0; i<variant.length; i++) {
                        if (variant[i].size === "All Sizes") {
                            for (let k = 0; k<sizeArray.length; k++) {
                                const currentStock = await tx.warehouseProduct.findFirst({
                                    where: {
                                        productVariantID: variant[i].id,
                                        size: sizeArray[k],
                                        warehouseID: stockMutation.warehouseID
                                    }, include: {
                                        productVariant: {
                                            include: {
                                                product: {
                                                    select:{
                                                        name:true
                                                    }
                                                }
                                            }
                                        }
                                    }
                                })
                                if (!currentStock) throw "Product variant not found."
                                if (currentStock!.stock < variant[i].qty && type == "REMOVE") throw `Failed to remove, insufficient stock at ${wareHouseList!.warehouseName} (${currentStock!.stock}, ${currentStock?.productVariant.color}, ${sizeArray[k]})` 
                                const newStockLog = await tx.stockMutationItem.create({
                                    data: {
                                        id: uuidv4(),
                                        quantity: variant[i].qty,
                                        stockMutationID: stockMutation.id,
                                        warehouseProductID: currentStock!.id
                                    }
                                })
                                await tx.warehouseProduct.update({
                                    where: {
                                        id: currentStock?.id,
                                    }, 
                                    data:{
                                        stock: Number(mutationType == "RESTOCK" || mutationType === "INBOUND"
                                            ? newStockLog.quantity + currentStock!.stock 
                                            : currentStock!.stock > newStockLog.quantity
                                            ? currentStock!.stock - newStockLog.quantity
                                            : 0
                                        ),
                                        updatedAt: new Date()
                                    }
                                })
                            }
                        } else {
                            const currentStock = await tx.warehouseProduct.findFirst({
                                where: {
                                    productVariantID: variant[i].id,
                                    size: variant[i].size.toUpperCase(),
                                    warehouseID: stockMutation.warehouseID
                                }, include: {
                                    productVariant: {
                                        include: {
                                            product: {
                                                select:{
                                                    name:true
                                                }
                                            }
                                        }
                                    }
                                }
                            })  
                            if (!currentStock) throw "Product variant not found."
                            if (currentStock!.stock < variant[i].qty && type == "REMOVE") throw `Failed to remove, insufficient stock at ${wareHouseList!.warehouseName} (${currentStock!.stock}, ${currentStock?.productVariant.color}, ${variant[i].size.toUpperCase()})`       
                            const newStockLog = await tx.stockMutationItem.create({
                                data: {
                                    id: uuidv4(),
                                    quantity: variant[i].qty,
                                    stockMutationID: stockMutation.id,
                                    warehouseProductID: currentStock!.id
                                }
                            })                                                       
                            await tx.warehouseProduct.update({
                                where: {
                                    id: currentStock?.id,
                                }, 
                                data: {
                                    stock: Number(mutationType == "RESTOCK" || mutationType === "INBOUND"
                                        ? newStockLog.quantity + currentStock!.stock 
                                        : currentStock!.stock > newStockLog.quantity
                                        ? currentStock!.stock - newStockLog.quantity
                                        : 0
                                    )
                                }
                            })     
                        }
                    }
                } 
                const getProduct = await tx.productVariant.findUnique({
                    where: {
                        id: variant[0].id
                    }, select: {
                        product: {
                            select: {
                                id: true
                            }
                        }
                    }
                })
                await tx.product.update({
                    data: {
                        stockUpdatedAt: new Date()
                    },
                    where: {
                        id: getProduct!.product.id
                    }
                })
                return res.status(200).send({
                    status: 'ok',
                    message: 'stock updated'
                }) 
            })     
        } catch (error:any) {
            serverResponse(res, 400, 'error', error)
        }
    }

    async getStockByVariant(req: Request, res: Response) {
        try {
            const {s, w} = req.query
            const {variant} = req.params
            if (w && !s) {
                const stock = await prisma.warehouseProduct.groupBy({
                    by: ['size'],
                    _sum: {
                        stock: true
                    }, 
                    where: {
                        productVariantID: String(variant),
                        warehouse: {
                            warehouseName: String(w)
                        }
                    },
                })
                const totalStock = await prisma.warehouseProduct.aggregate({
                    _sum: {
                        stock: true
                    }, 
                    where: {
                        productVariantID: String(variant),
                    },
                })
                serverResponse(res, 200, 'ok', 'stock found', {stock, totalStock})
            }
            else if (w && s) {
                const stock = await prisma.warehouseProduct.aggregate({
                    _sum: {
                        stock: true
                    }, 
                    where: {
                        productVariantID: String(variant),
                        size: String(s).toUpperCase() as ProductSize,
                        warehouse: {
                            warehouseName: String(w)
                        }
                    },
                })
                serverResponse(res, 200, 'ok', 'stock found', stock._sum)
            } else {
                const stock = await prisma.warehouseProduct.aggregate({
                    _sum: {
                        stock: true
                    }, 
                    where: {
                        productVariantID: String(variant),
                        size: String(s).toUpperCase() as ProductSize,
                    },
                })
                serverResponse(res, 200, 'ok', 'stock found', stock._sum)
            }
        } catch (error) {
            serverResponse(res, 400, 'error', 'stock not found', error)
        }
        
    }

    async getAllStock(req: Request, res: Response) {
        try {
            const {w, p, l} = req.query
            console.log(w);
            const { from, to } = req.body;


            await prisma.$transaction(async (tx)=> {
                const fromDate = new Date(from);
                fromDate.setHours(0, 0, 0, 0)
                const toDate = new Date(to);
                toDate.setDate(toDate.getDate());
                toDate.setHours(23, 59, 0, 0);
                let limit = l ? l : 10
                const totalProduct = await tx.product.count()
                if (w === 'All Warehouses' || !w) {
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
                                            }
                                        }
                                    },where: {
                                        isDeleted: false
                                    },
                                },
                                category: true,
                            },
                            take: +limit, 
                            skip: (+p! - 1) * +limit,
                            orderBy: {
                                stockUpdatedAt: 'desc'
                            }
                        })
                        const productsWithStock = products.map(product => ({
                            ...product,
                            variants: product.variants.map(variant => ({
                            ...variant,
                            totalStock: variant.warehouseProduct.reduce((total, wp) => total + wp.stock, 0)
                            }))
                        }));
                    
                        const productData = productsWithStock.map(product => ({
                            ...product,
                            totalStock: product.variants.reduce((total, variant) => {
                            return total + variant.warehouseProduct.reduce((variantTotal, wp) => variantTotal + wp.stock, 0);
                            }, 0)
                        }));
                        
                        const productList = await Promise.all(productData.map(async (product) => {
                          const stockIn = await prisma.stockMutationItem.aggregate({
                            _sum: {
                              quantity: true,
                            },
                            where: {
                              WarehouseProduct: {
                                productVariant: {
                                  product: {
                                    id: product.id
                                  }
                                }
                              },
                              stockMutation: {
                                AND: [
                                  { type: 'RESTOCK' },
                                  { createdAt: { gte: fromDate,lte: toDate } },
                                ]
                              },
                            },
                          });

                          console.log(stockIn);
                          
                         
                        
                          const stockOut = await prisma.stockMutationItem.aggregate({
                            _sum: {
                              quantity: true,
                            },
                            where: {
                              WarehouseProduct: {
                                productVariant: {
                                  product: {
                                    id: product.id
                                  }
                                }
                              },
                              stockMutation: {
                                AND: [
                                  { OR: [{ type: 'DELETE' }, { type: 'REMOVE' }, { type: 'TRANSACTION' }] },
                                  { createdAt: { gte: fromDate,lte: toDate } }
                                ]
                              },
                            },
                          });

                          const toDateStockIn = await prisma.stockMutationItem.aggregate({
                            _sum: {
                              quantity: true,
                            },
                            where: {
                              WarehouseProduct: {
                                productVariant: {
                                  product: {
                                    id: product.id
                                  }
                                }
                              },
                              stockMutation: {
                                AND: [
                                  { type: 'RESTOCK' },
                                  { createdAt: { lte: toDate } }
                                ]
                              },
                            },
                          });
                         
                        
                          const toDateStockOut = await prisma.stockMutationItem.aggregate({
                            _sum: {
                              quantity: true,
                            },
                            where: {
                              WarehouseProduct: {
                                productVariant: {
                                  product: {
                                    id: product.id
                                  }
                                }
                              },
                              stockMutation: {
                                AND: [
                                  { OR: [{ type: 'DELETE' }, { type: 'REMOVE' }, { type: 'TRANSACTION' }] },
                                  { createdAt: { lte: toDate } }
                                ]
                              },
                            },
                          });

                          const toDateStock = (toDateStockIn._sum.quantity?  toDateStockIn._sum.quantity : 0) - (toDateStockOut._sum.quantity ? toDateStockOut._sum.quantity : 0)
                        
                          return {
                            ...product,
                            stockIn,
                            stockOut,
                            toDateStock
                          };
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
                                            }
                                        },
                                        select: {
                                            warehouseID: true,
                                            id: true,
                                            size: true,
                                            stock: true,
                                            updatedAt: true,
                                        },
                                    }
                                }, where: {
                                    isDeleted: false
                                },
                            },
                            category: true
                        },
                        take: +limit, 
                        skip: (+p! - 1) * +limit,
                        orderBy: {
                            stockUpdatedAt: 'desc'
                        }
                    })
                    const productsWithStock = products.map(product => ({
                        ...product,
                        variants: product.variants.map(variant => ({
                        ...variant,
                        totalStock: variant.warehouseProduct.reduce((total, wp) => total + wp.stock, 0)
                        }))
                    }));
                
                    const productData = productsWithStock.map(product => ({
                        ...product,
                        totalStock: product.variants.reduce((total, variant) => {
                        return total + variant.warehouseProduct.reduce((variantTotal, wp) => variantTotal + wp.stock, 0);
                        }, 0)
                    }));

                    const productList = await Promise.all(productData.map(async (product) => {
                        const stockIn = await prisma.stockMutationItem.aggregate({
                          _sum: {
                            quantity: true,
                          },
                          where: {
                            WarehouseProduct: {
                              warehouse: {
                                warehouseName: String(w),
                              },
                              productVariant: {
                                product: {
                                  id: product.id
                                }
                              }
                            },
                            stockMutation: {
                              AND: [
                                { OR: [
                                    { AND : [
                                        {type: "INBOUND"},
                                        {status: 'ACCEPTED'}
                                        ]
                                    }, 
                                    { type: 'RESTOCK' }
                                ] },
                                { createdAt: { gte: fromDate, lte: toDate } }
                              ]
                            },
                          },
                        });
                    
                        const stockOut = await prisma.stockMutationItem.aggregate({
                          _sum: {
                            quantity: true,
                          },
                          where: {
                            WarehouseProduct: {
                              productVariant: {
                                product: {
                                  id: product.id
                                }
                              },
                              warehouse: {
                                warehouseName: String(w)
                              }
                            },
                            stockMutation: {
                              AND: [
                                { OR: [
                                    { type: 'DELETE' }, 
                                    { type: 'REMOVE' }, 
                                    { type: 'TRANSACTION' },
                                    { AND: [
                                        {type: 'TRANSFER'},
                                        {status: 'ACCEPTED'}
                                    ] }, 
                                ] },
                                { createdAt: { gte: fromDate,lte: toDate } }
                              ]
                            },
                          },
                        });

                        const toDateStockIn = await prisma.stockMutationItem.aggregate({
                            _sum: {
                              quantity: true,
                            },
                            where: {
                              WarehouseProduct: {
                                warehouse: {
                                  warehouseName: String(w),
                                },
                                productVariant: {
                                  product: {
                                    id: product.id
                                  }
                                }
                              },
                              stockMutation: {
                                AND: [
                                  { OR: [
                                      { AND : [
                                          {type: "INBOUND"},
                                          {status: 'ACCEPTED'}
                                          ]
                                      }, 
                                      { type: 'RESTOCK' }
                                  ] },
                                  { createdAt: { lte: toDate } }
                                ]
                              },
                            },
                          });

                          const toDateStockOut = await prisma.stockMutationItem.aggregate({
                            _sum: {
                              quantity: true,
                            },
                            where: {
                              WarehouseProduct: {
                                warehouse: {
                                  warehouseName: String(w),
                                },
                                productVariant: {
                                  product: {
                                    id: product.id
                                  }
                                }
                              },
                              stockMutation: {
                                AND: [
                                  { OR: [
                                      { type: 'DELETE' }, 
                                      { type: 'REMOVE' }, 
                                      { type: 'TRANSACTION' },
                                      { AND: [
                                          {type: 'TRANSFER'},
                                          {status: 'ACCEPTED'}
                                      ] }, 
                                  ] },
                                  { createdAt: { lte: toDate } }
                                ]
                              },
                            },
                          });

                          const toDateStock = (toDateStockIn._sum.quantity?  toDateStockIn._sum.quantity : 0) - (toDateStockOut._sum.quantity ?toDateStockOut._sum.quantity : 0)
                    
                        return {
                          ...product,
                          stockIn,
                          stockOut,
                          toDateStock
                        };
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
    
    async getStockSlug(req: Request, res: Response) {
        const {w, type, p, l} = req.query
        const {slug} = req.params
        const { from, to } = req.body;
        const fromDate = new Date(from);
        fromDate.setHours(0, 0, 0, 0)
        const toDate = new Date(to);
        toDate.setHours(23, 59, 59, 999);     
        const limit = l ? l : 10
        
        try {
            const stocks = await prisma.stockMutationItem.findMany({
                where: {
                    WarehouseProduct: {
                        productVariant: {
                            product: { slug }
                        }
                    },stockMutation: {
                        createdAt: {
                            gte: fromDate,
                            lte: toDate
                        },
                        type: type ? String(type).toUpperCase() as MutationTypes
                        : { not: undefined },
                        warehouse: {
                            warehouseName: w ? String(w)
                            : { not: undefined }
                        },
                        OR: [
                            { status: "ACCEPTED" },
                            { status: null }
                        ]
                    }
                },
                include: {
                    stockMutation: true,
                    WarehouseProduct: {
                        include: {
                            productVariant: true,
                            warehouse: true
                        }
                    }
                },
                take: +limit, 
                skip: (+p! - 1) * +limit,
                orderBy: {
                    stockMutation: {
                        createdAt: 'desc'
                    }
                }
            })

            const totalData = await prisma.stockMutationItem.count({
                where: {
                    WarehouseProduct: {
                        productVariant: {
                            product: { slug }
                        }
                    },stockMutation: {
                        type: type ? String(type).toUpperCase() as MutationTypes
                        : { not: undefined },
                        warehouse: {
                            warehouseName: w ? String(w)
                            : { not: undefined }
                        },
                        OR: [
                            { status: "ACCEPTED" },
                            { status: null }
                        ]
                    }
                },
            })

            const stockList = await Promise.all(stocks.map(async (item) => {
                let associatedWH = null;
            
                if (item.stockMutation.associatedWarehouseID) {
                    associatedWH = await prisma.warehouse.findFirst({
                        where: {
                            id: item.stockMutation.associatedWarehouseID
                        }
                    });
                }
            
                return {
                    ...item,
                    associatedWH
                };
            }));
            res.status(200).send({
                status: 'ok',
                message: 'Stock data found',
                stockList,
                totalData
            })
        } catch (error:any) {
            serverResponse(res, 400, 'error', error)
            
        }
    }
    
}