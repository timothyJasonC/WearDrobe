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
import { CreateProductForm } from "./createProductForm"
import { useState } from "react";
  
  export function CreateProductDialog() {
    const [open, setOpen] = useState(false);
    return (
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <div className='flex items-center gap-1 border-b-2 max-sm:text-xs max-sm:border-b-[1px] border-b-black hover:bg-gray-100 hover:cursor-pointer'>
              <p>Create</p>
              <PiArrowSquareOut />      
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent className="max-sm:h-full max-sm:min-w-full gap-0  min-w-full sm:min-w-[85%] lg:min-w-[800px] focus-visible:outline-none">
          <AlertDialogHeader>
            <AlertDialogTitle className='text-3xl'>Create Products</AlertDialogTitle>
            <AlertDialogDescription>
              Create new products details.
            </AlertDialogDescription>
            <CreateProductForm 
            setOpen={setOpen}
            />
          </AlertDialogHeader>
          

        </AlertDialogContent>
      </AlertDialog>
    )
  }
  