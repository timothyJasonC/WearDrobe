/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { TableCell, TableRow} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Selector } from '../manageProductModal/selector';
import { PiArrowRightBold, PiTrashFill } from 'react-icons/pi';
import { toast } from 'sonner';
import { IProduct, IWarehouse } from '@/constants';

interface IStockArray {
  size: string
  id: string
  qty: number
  variant: string
}

interface IDefaultTable {
    productData: IProduct
    updateType: string
    setStockArray: React.Dispatch<React.SetStateAction<IStockArray[]>>
    stockArray: IStockArray[]
    index: number
    setIsValid: React.Dispatch<React.SetStateAction<boolean>>
    handleDelete: (value:number) => void
    setSize: React.Dispatch<React.SetStateAction<string>>
    warehouse:string
    warehouseList: IWarehouse[]
}

export const DefaultTable = ({productData,updateType, setStockArray, stockArray, index, setIsValid, handleDelete, setSize, warehouse, warehouseList}:IDefaultTable) => {
  const [variant, setVariant] = useState('')
  const [qty, setQty] = useState(0)
  const [selectSize, setSelectSize] = useState('All Sizes')

  useEffect(() => {
    setSize(selectSize)
  }, [selectSize])



  const handleAddArr = () => {
      const id = productData.variants.filter(item => item.color === variant).map(item => item.id)[0];
      const sizeFix =  productData.oneSize ? "ONESIZE" : selectSize
      const newStock:IStockArray = {size:sizeFix, id, qty, variant}
      if (stockArray.length -1 < index) {
        setStockArray([...stockArray, newStock]);
      } else {
        const currentArray = [...stockArray]
        currentArray.splice(index, 1, newStock)
        setStockArray(currentArray)
      }
    }
  useEffect(() => {
    if (variant && selectSize && qty && qty !== 0) {
      setIsValid(true)
      handleAddArr()
    }
  }, [variant, selectSize, qty])

  return (
    <TableRow>
        <TableCell className="font-medium text-center ">
          {
            productData ? 
              <Selector
                  width="rounded-full text-xs h-7"
                  label="variants"
                  state={productData.variants.map(item => item.color)}
                  setState={setVariant}                  
              /> 
              :
              <Selector
                label="variants"
                disabled={true}
                state={["No Variant"]}
                setState={setVariant}                 
              /> 
          }
        </TableCell>
        <TableCell>
          { productData ?
              <Selector
                  width="rounded-full text-xs h-7"
                  label="Size"
                  disabled={productData.oneSize? true : false}
                  state={productData.oneSize? ["All Sizes"] : ["All Sizes", 'S', 'M', 'L', 'XL']}
                  setState={setSelectSize}
                  defValue={selectSize ? selectSize : "All Sizes"}                    
              />
              :
              <Selector
                  width="rounded-full text-xs h-7"
                  label="Size"
                  disabled={true}
                  state={["No Size"]}
                  setState={setSelectSize}                  
              />
          }
        </TableCell>
        <TableCell>
        <Input
            disabled={variant ? false : true}
            type='text'
            inputMode='decimal'
            placeholder="0"
            value={qty ?? ''}
            className="focus-visible:ring-black/0 focus-visible:border-black/60 text-center h-7"
            onChange={(e) => {
            const value = e.target.value;
            if (value === "" || !isNaN(Number(value))) {
                if (isNaN(Number(value)) || Number(value) > 1000) {
                  toast.warning("Maximum stock change limit is 1.000.");
                } else {
                  setQty(Number(value));
                }
              }
            }}
        />  
        </TableCell>
        <TableCell className="">
          <div className="flex items-center justify-center gap-1">
              <div>
              { productData ?
                Number(productData.variants.filter(item => item.color === variant).map(item => item.totalStock))
                : 0
              }                    
              </div>
            <div>
              <PiArrowRightBold className={`text-xs ${updateType === "REMOVE" ? "text-red-500" : "text-green-500"}`} />
            </div>
            <div>
              {productData ?
              updateType === "RESTOCK" ?
              Number(productData.variants.filter(item => item.color === variant).map(item => item.totalStock)) + (qty * (productData.oneSize? 1 : selectSize === "All Sizes"? 4 : 1) * (warehouse === "All Warehouses" ? warehouseList.length : 1))
              : updateType === "REMOVE" ?
              Number(productData.variants.filter(item => item.color === variant).map(item => item.totalStock)) - qty < 0 ?
                  0
                : Number(productData.variants.filter(item => item.color === variant).map(item => item.totalStock)) - (qty * (productData.oneSize? 1 : selectSize === "All Sizes"? 4 : 1) * (warehouse === "All Warehouses" ? warehouseList.length : 1))
              : 0 + (qty * (productData.oneSize? 1 : selectSize === "All Sizes"? 4 : 1))
            : 0}
            </div>
          </div>
        </TableCell>
        <TableCell>
          <PiTrashFill className={`${index !== 0? "flex" : "hidden"} text-red-400 hover:text-red-500 hover:cursor-pointer`} onClick={() => handleDelete(index)}/>
        </TableCell>
    </TableRow>
  )
}
