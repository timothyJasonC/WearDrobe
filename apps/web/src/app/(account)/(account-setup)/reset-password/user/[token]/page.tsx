import MarqueeBackground from "@/app/(account)/_components/MarqueeBackground"
import React from "react"
import ResetPassDialog from "../../_components/ResetPassDialog"
import { Toaster } from "@/components/ui/sonner"

export default function Page() {
    return (
        <div className="h-screen overflow-hidden bg-black flex justify-center">
            <MarqueeBackground />
            <ResetPassDialog className="" title="Reset Password" />
            <Toaster position="top-center" richColors />
        </div>
    )
};

