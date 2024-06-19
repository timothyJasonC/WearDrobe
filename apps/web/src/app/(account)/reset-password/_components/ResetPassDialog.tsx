import React from "react"
import { VerifyCurrentPassForm } from "./VerifyCurrentPassForm"
import { NewPassForm } from "./NewPassForm"

export default function ResetPassDialog({ className, title } : { className:string, title: string }) {
    return (
        <div className={`${ className } h-screen flex items-center justify-center max-w-96 z-10 relative overflow-hidden`}>
            <div className="flex gap-10 max-w-96 rounded-xl bg-white relative h-fit">
                <VerifyCurrentPassForm className={"max-w-96"} />
                <NewPassForm className={"w-96 absolute left-[100%]"} />
            </div>
        </div>
    )
};

