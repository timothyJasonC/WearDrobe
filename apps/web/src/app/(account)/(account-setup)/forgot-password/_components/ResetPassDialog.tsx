import React from "react"
import { NewPassForm } from "./NewPassForm"

export default function ResetPassDialog({ className } : { className:string }) {
    return (
        <div className={`${ className } h-screen z-10 relative flex items-center justify-center`}>
            <div className=" max-w-96 rounded-xl bg-white">
                <NewPassForm />
            </div>
        </div>
    )
};

