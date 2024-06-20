'use client'
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { useEffect, useState } from "react";
import { PiNotePencil } from "react-icons/pi";
import { EditProductForm } from "./editProductForm";
  
  export function EditProductDialog({slug, action}:{slug:string, action:()=>void}) {
    const [open, setOpen] = useState(false);

    useEffect(() => {
      action()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open])
    return (
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
            <div className="flex justify-center items-center gap-1 border-b-2 border-b-transparent hover:cursor-pointer">
                <PiNotePencil className="text-xl hover:border-b-2 hover:border-b-black"/>
            </div>
        </AlertDialogTrigger>
        <AlertDialogContent className="max-sm:h-full max-sm:min-w-full gap-0  min-w-full sm:min-w-[85%] lg:min-w-[800px] focus-visible:outline-none">
          <AlertDialogHeader>
            <AlertDialogTitle className='text-3xl'>Edit Products</AlertDialogTitle>
            <AlertDialogDescription>
                Edit products details.
            </AlertDialogDescription>
            <EditProductForm 
            setOpen={setOpen}
            slug={slug}
            />
          </AlertDialogHeader>

        </AlertDialogContent>
      </AlertDialog>
    )
  }
  