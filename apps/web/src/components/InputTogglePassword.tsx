'use client'
import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { PiEye, PiEyeClosed } from "react-icons/pi";

export default function InputTogglePassword({ className, placeholder, size = 'w-72', defaultValue, disabled }: { className?: string, placeholder?: string, size?: string, defaultValue?: string, disabled?: boolean }) {

    const [ passwordHidden, setPasswordHidden ] = useState(true);

    return (
        <div className={`relative ${size}`}>
            <Input 
            disabled={disabled}
            type={ passwordHidden? "password" : "string" }
            className={`focus-visible:ring-black/0 focus-visible:border-black/60 duration-200 ${className} `} placeholder={placeholder} defaultValue={defaultValue} />
            {
                passwordHidden? 
                <PiEyeClosed onClick={() => {
                    setPasswordHidden(!passwordHidden)
                }} className="cursor-pointer top-0 bottom-0 m-auto right-2 absolute" size={'1.1rem'} />
                :
                <PiEye onClick={() => {
                    setPasswordHidden(!passwordHidden)
                }} className="cursor-pointer top-0 bottom-0 m-auto right-2 absolute" size={'1.1rem'} />
            }
        </div>
    )
};

