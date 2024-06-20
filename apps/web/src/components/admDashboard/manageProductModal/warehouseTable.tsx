/* eslint-disable @next/next/no-img-element */
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  
  interface IColor {
    warehouseName: string, 
    qtySize: number, 
    qtyColor: number
    }
import { PiTrashFill } from "react-icons/pi";

  
  export function WarehouseTable({assignWarehouse, isOneSize, setAssignWarehouse, color}:{assignWarehouse:IColor[], isOneSize:any, setAssignWarehouse:any, color:any}) {

    const handleDelete = (idx:number) => {
      setAssignWarehouse(assignWarehouse.filter((item, index) => index !== idx))
    }
    return (
      <div className="mt-2 border-[1px] rounded overflow-hidden">
        <Table className="min-w-[300px]">
          <TableHeader>
            <TableRow className="bg-secondary">
              <TableHead className=""></TableHead>
              <TableHead className="w-[100px] text-center">Warehouse</TableHead>
              <TableHead className="text-center">Qty/size</TableHead>
              <TableHead className="text-center">Qty/color</TableHead>
              <TableHead className="text-center">Total</TableHead>
              <TableHead className="text-center"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {assignWarehouse.length ? 
              assignWarehouse.map((item:IColor, index:number) => (
                  <TableRow key={index} className="">
                  <TableCell className="font-medium">{index+1}</TableCell>
                  <TableCell className="font-medium text-center">{item.warehouseName}</TableCell>
                  <TableCell className="font-medium text-center">{item.qtySize}</TableCell>
                  <TableCell className="font-medium text-center">{item.qtyColor}</TableCell>
                  <TableCell className="font-medium text-center">{(item.qtyColor * color.length) * (item.qtySize * (isOneSize ? 1 : 4))}</TableCell>
                  
                  <TableCell>
                      <PiTrashFill className='flex text-red-400 hover:text-red-500' onClick={() => handleDelete(index)}/>
                  </TableCell>
                  </TableRow>
              ))
              : 
              <TableRow>
                  <TableCell className="font-medium text-xs" colSpan={4} >Data will appear here.</TableCell>
              </TableRow>
              }
          </TableBody>
        </Table>
      </div>
    )
  }
  