'use client'
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { PiArrowSquareOut } from "react-icons/pi"
import { useEffect, useState } from "react";
import { Selector } from "../manageProductModal/selector";
import { getWarehouse } from "@/app/action";
import { IWarehouse } from "@/constants";
  


export function StockDialog() {
const [warehouseList, setWarehouseList] = useState<IWarehouse[]>([])
const [selectedWH, setSelectedWH] = useState('')

const getData = async() => {
    const warehouse = await getWarehouse()
    setWarehouseList(warehouse)
    setSelectedWH(warehouse[0].warehouseName)
}

console.log(warehouseList);


useEffect(() => {
    getData()
}, [])
const [open, setOpen] = useState(false);
return (
    <AlertDialog open={open} onOpenChange={setOpen}>
    <AlertDialogTrigger asChild>
        <div className='flex items-center gap-1 border-b-2 max-sm:text-xs max-sm:border-b-[1px] border-b-black hover:bg-gray-100 hover:cursor-pointer'>
            <p>Manage</p>
            <PiArrowSquareOut />      
        </div>
    </AlertDialogTrigger>
    <AlertDialogContent className="max-sm:h-full max-sm:min-w-full gap-0  min-w-full sm:min-w-[85%] lg:min-w-[800px] focus-visible:outline-none">
        <AlertDialogHeader>
        <AlertDialogTitle className='text-3xl'>manage Stocks</AlertDialogTitle>
        <AlertDialogDescription>
            Create new products details.
        </AlertDialogDescription>
        </AlertDialogHeader>
        
        <div>
        <Selector 
        label="Warehouses"
        defValue={selectedWH}
        state={warehouseList}
        setState={setSelectedWH}
        />
        </div>

    </AlertDialogContent>
    </AlertDialog>
)
}
  