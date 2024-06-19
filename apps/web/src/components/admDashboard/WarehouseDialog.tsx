'use client'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { PiPlusBold } from "react-icons/pi";
import { Selector } from "./manageProductModal/selector";
import { Label } from "@/components/ui/label"

export function WarehouseDialog({setWarehouse, assignWarehouse, warehouse, warehouseList, setAssignWarehouse}:{setWarehouse:any, assignWarehouse:any, warehouse:any, warehouseList:any, setAssignWarehouse:any}) {
  const [open, setOpen] = useState(false);
  const [qtySize, setQtySize] = useState(0)
  const [qtyColor, setQtyColor] = useState(0)


  const AddAssignedWarehouse = () => {
      const data = {warehouseName: warehouse, qtySize: qtySize, qtyColor: qtyColor}
      const updatedAssignment = [...assignWarehouse, {...data}]
    setAssignWarehouse(updatedAssignment)
    // const updatedColors = [...color, {...data}];
    // setColor(updatedColors)
    // setColorHEX('#000000')
    // setColorName('')
    // setOpen(false)
    }

  return (
        <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            <div className='flex  items-center justify-center gap-1 font-semibold text-xs ]mr-3 bg-gray-100 rounded-sm p-1 cursor-pointer mb-2 w-40'>
                <p>Assign warehouse</p>
                <PiPlusBold/> 
            </div>
        </DialogTrigger>
        
        <DialogContent className="sm:max-w-[300px]">
            <DialogHeader>
            <DialogTitle>Assign warehouse</DialogTitle>
            </DialogHeader>
            
            <div className="w-full"> 
                <Selector 
                label='Warehouse'
                state={["All Warehouse", ...warehouseList]}
                setState={setWarehouse}
                />
            </div>

            <div className="flex items-center grow justify-between gap-2">
                <Label htmlFor="size-amount">Qty/Size</Label>
                <Input
                    type="number"
                    placeholder="0"
                    className="focus-visible:ring-transparent focus-visible:border-[1px] focus-visible:border-black w-32 text-center"
                    onChange={(e) => {setQtySize(Number(e.target.value))}}
                />
            </div>

            <div className="flex items-center grow justify-between gap-2 mt-3">
                <Label htmlFor="size-amount">Qty/Color</Label>
                <Input
                    type="number"
                    placeholder="0"
                    className="focus-visible:ring-transparent focus-visible:border-[1px] focus-visible:border-black w-32 text-center"
                    onChange={(e) => {setQtyColor(Number(e.target.value))}}
                />
            </div>
            

            
            <Button type="submit" onClick={AddAssignedWarehouse}>Assign</Button>
        </DialogContent>
        </Dialog>
  )
}
