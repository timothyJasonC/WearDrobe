/* eslint-disable @next/next/no-img-element */
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { IProduct, IWarehouse } from "@/constants"
import { useState } from "react"
import { toast } from "sonner"
import { DefaultTable } from "./editStockInput"
import { table } from "console"



interface IStockArray {
  size: string
  id: string
  qty: number
  variant: string
}

interface IStock {
  productData: IProduct
  updateType: string
  setStockArray: React.Dispatch<React.SetStateAction<IStockArray[]>>
  stockArray: IStockArray[]
  setIsValid: React.Dispatch<React.SetStateAction<boolean>>
  isValid: boolean
  size: string
  warehouse:string
  warehouseList: IWarehouse[]
  setSize: React.Dispatch<React.SetStateAction<string>>
}

  export function EditStockTable({productData, updateType, stockArray, isValid, setIsValid, setStockArray, size, setSize, warehouse, warehouseList}:IStock) {
    const [tableRows, setTableRows] = useState([0])


    const addRow = () => {
      if (isValid) {
        setTableRows([...tableRows, tableRows[tableRows.length -1] + 1])
        setIsValid(false)
      } else {
        toast.warning("Current stock data is incomplete.")
      }
    }
    console.log(tableRows);
    
    
    const handleDelete = (index:number) => {
      if (tableRows.length > 1) {
        const currentArray = [...stockArray]
        currentArray.splice(index, 1)
        setStockArray(currentArray)
        const rows = [...tableRows]
        rows.splice(index, 1)
        setTableRows(rows)
        setIsValid(true)
      }
    }

    return (
      <div className="mt-4 border-[1px] rounded">
        <Table className="">
          <TableHeader>
            <TableRow className="bg-secondary">
              <TableHead className="text-center w-40">Variants</TableHead>
              <TableHead className="text-center w-28">Size</TableHead>
              <TableHead className="text-center w-28">Qty</TableHead>
              <TableHead className="text-center">Stock</TableHead>
              <TableHead className="text-center"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableRows.map((row:any, index:number) => (
              <DefaultTable
                key={index}
                index={index}
                productData={productData}
                updateType={updateType}
                stockArray={stockArray}
                setStockArray={setStockArray}
                setIsValid={setIsValid}
                setSize={setSize}
                warehouse={warehouse}
                warehouseList={warehouseList}
                handleDelete={(index) => handleDelete(index)}
              />
            ))}      
            <TableRow>
                <TableCell className="font-medium text-xs text-center hover:cursor-pointer py-2 hover:underline" colSpan={5} onClick={addRow}><div></div>Add another stock update +</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    )
  }
  