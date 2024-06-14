import { AuthCard } from "@/app/(account)/auth/_components/AuthCard"
import { Toaster } from "@/components/ui/sonner"
import Image from "next/image"
import React from "react"

export default function Page() {

    const imgUrl = 'https://images.unsplash.com/photo-1631902112544-2271267abb73?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

    return (
        <div className="flex flex-col lg:flex-row items-center h-screen overflow-hidden">
            <div className=" h-full w-full relative">
                <Image priority fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="max-lg:blur-[1px] h-full object-cover w-full" src={imgUrl} alt="" 
                />
            </div>
            <div className="p-4
                lg:w-[50%] w-full max-lg:p-4 
                flex justify-center items-center
                absolute lg:static top-0 bottom-0
            ">
                <AuthCard/>
                <Toaster position="top-center" richColors />
            </div>
        </div>
    )
};
