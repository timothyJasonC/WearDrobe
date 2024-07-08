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
import { useState } from "react";
import { IProduct, IWarehouse } from "@/constants";
import { StockForm } from "./stockForm";
import { Button } from "@/components/ui/button";
  
interface IDropdown {
    selectedWH:string,
    setSelectedWH:React.Dispatch<React.SetStateAction<string>>
    warehouseList: IWarehouse[]
    setOpen:React.Dispatch<React.SetStateAction<boolean>>
    open:boolean
  }

export function StockDialog({selectedWH, setSelectedWH, warehouseList, setOpen, open}:IDropdown) {

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild className="overflow-x-hidden">
            <Button>
                <div className='flex items-center gap-1 max-sm:text-xs'>
                    <p>Update Stock</p>
                    <PiArrowSquareOut className="text-xl"/>      
                </div>
            </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="max-sm:h-full max-sm:min-w-full gap-0  min-w-full sm:min-w-[85%] lg:min-w-[800px] focus-visible:outline-none">
            <AlertDialogHeader>
            <AlertDialogTitle className='text-3xl'>manage Stocks</AlertDialogTitle>
            <AlertDialogDescription>
                Create new products details.
            </AlertDialogDescription>
            </AlertDialogHeader>
            
            <div className="overflow-x-hidden">
            <StockForm 
                selectedWH={selectedWH}
                warehouseList={warehouseList}
                setOpen={setOpen}
            />
            </div>

        </AlertDialogContent>
        </AlertDialog>
    )
}
  