import React from "react"
import { SetupAccountDialog } from "../_components/SetupAccountDialog";
import SetupUserAccountForm from "../_components/SetupUserAccountForm";
import { Toaster } from "@/components/ui/sonner"

export default function Page() {
    return (
        <div className="h-screen relative flex justify-center items-center">
            <SetupAccountDialog className="absolute" title={"Just a few more steps.."} form={<SetupUserAccountForm />}  />
            <Toaster position="top-center" richColors />
        </div>
    )
};

