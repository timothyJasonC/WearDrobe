import React from "react"
import { SetupAccountDialog } from "../_components/SetupAccountDialog";
import { Toaster } from "@/components/ui/sonner"
import BrickPhotoBackground from "@/app/(account)/_components/BrickPhotoBackground";

export default function Page() {
    
    return (
        <div className="h-screen flex justify-center items-center relative overflow-hidden">
            <BrickPhotoBackground />
            <span className="absolute bottom-4 right-[5%] font-thin text-base text-white items-start hidden lg:flex">WearDrobe <span className="text-xs">&copy;</span></span>
            <SetupAccountDialog className="absolute" title={"Just a few more steps.."}  />
            <Toaster position="top-center" richColors />
        </div>
    )
};

