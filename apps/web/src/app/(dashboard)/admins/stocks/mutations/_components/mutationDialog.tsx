'use client'
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { PiPlusBold } from "react-icons/pi"
import { Button } from "@/components/ui/button";
import React from "react";
import { MutationForm } from "./mutationForm";
  


export function MutationDialog({open, setOpen, selectedWH}:{open:boolean, setOpen:React.Dispatch<React.SetStateAction<boolean>>, selectedWH:string}) {

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
            <Button className={`flex h-7 items-center text-xs w-52 gap-1 font-semibold justify-center mr-3 bg-black text-white rounded-sm p-1 cursor-pointer`}>
                <p>Create new request</p>
                <PiPlusBold/> 
            </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="max-sm:h-full max-sm:min-w-full gap-0  focus-visible:outline-none">
            <AlertDialogHeader>
            <AlertDialogTitle className='text-3xl'>Mutation Form</AlertDialogTitle>
            <AlertDialogDescription>
                Create mutation request.
            </AlertDialogDescription>
            </AlertDialogHeader>
            
            <MutationForm selectedWH={selectedWH} setOpen={setOpen}/>

        </AlertDialogContent>
        </AlertDialog>
    )
}
  