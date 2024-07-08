import React from "react"
import AdminMenu from "./AdminMenu"
import { PiCaretDown, PiHeadsetBold, PiPassword, PiUser } from "react-icons/pi"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import DropdownLogout from "@/app/(dashboard)/admins/_components/DropdownLogout"
import ActiveIndicator from "./ActiveIndicator"
import { useRouter } from "next/navigation"
import { IAdmin } from "@/app/(dashboard)/admins/admins/_components/columns"

export default function AdminDashboardContent({ admin, activeButton }: { admin: IAdmin | null, activeButton: string }) {
    const router = useRouter()
    return (
        <>
            <div className='flex lg:flex-row-reverse lg:justify-between gap-5 items-center'>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div><PiCaretDown size={`2rem`} className='cursor-pointer p-2 rounded-full hover:bg-slate-200 duration-200 border-2 border-slate-200' /></div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='w-56 absolute -left-10'>
                        <DropdownMenuItem onClick={() => router.push('/admins/edit-profile')} className='flex gap-2 cursor-pointer'>
                            <PiUser size={`16px`} />
                            <span>Edit Profile</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => router.push('/admins/change-password')} className='flex gap-2 cursor-pointer'>
                            <PiPassword size={`16px`} />
                            <span>Change Password</span>
                        </DropdownMenuItem>
                        <DropdownLogout/>
                    </DropdownMenuContent>
                </DropdownMenu>
                <div>
                    <div className="flex items-center gap-2">
                        <ActiveIndicator isActive={admin && admin.accountActive ? true : false} activeText={`Your account is verified`} nonActiveText={"Your account is not verified"} />
                        <span className='text-base text-gray-500 truncate'>{ admin && admin?.role == 'warAdm' ? 'Warehouse Admin' : 'Super Admin' }</span>
                    </div>
                    <p className='text-xl truncate font-bold'>{ admin && admin?.fullName }</p>
                </div>
            </div>
            <AdminMenu role={admin && admin.role} activeButton={activeButton} />
            <div className='flex gap-2 items-center'>
                <PiHeadsetBold/>Help Center
            </div>
        </>
    )
};

