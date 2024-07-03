'use client'
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { handleLogout } from "@/lib/utils";
import { useRouter } from "next/navigation";
import React from "react"
import { PiSignOut } from "react-icons/pi";

export default function DropdownLogout() {
    const router = useRouter();
    return (
        <DropdownMenuItem onClick={() => {handleLogout(); router.push('/auth')} } className='flex gap-2 cursor-pointer'>
            <PiSignOut />
            Logout
        </DropdownMenuItem>
    )
};

