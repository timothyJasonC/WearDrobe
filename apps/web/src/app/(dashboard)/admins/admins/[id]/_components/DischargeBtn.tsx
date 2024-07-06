'use client'
import { AlertDialogHeader, AlertDialogFooter, AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import React, { useState } from "react"
import { PiDotsThreeVerticalBold, PiXCircleBold } from "react-icons/pi"
import { LoadingButton } from "@/components/ui/loading-button"
import { catchError } from "@/lib/utils"
import { deleteRequest } from "@/lib/fetchRequests"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { IAdmin } from "../../_components/columns"

export default function DischargeBtn({ admin }: { admin: IAdmin | null }) {

    const [ dialogOpen, setDialogOpen ] = useState(false)
    const [ dropdownOpen, setDropdownOpen ] = useState(false)
    const [ isLoading, setIsloading ] = useState(false)
    const router = useRouter()

    async function handleDischarge() {
        setIsloading(true)
        try {
            const res = await deleteRequest(`admin/${admin ? admin?.id : ''}`)
            const data = await res.json();
            if (res.ok) {
                toast.success(data.message)
                router.push('/admins/admins')
            } else {
                toast.error(data.message)
            }
            setDialogOpen(false)
        } catch (error) {
            catchError(error)
        }
        setIsloading(false)
    }

    return (
        <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DropdownMenu>
                <DropdownMenuTrigger onClick={() => setDropdownOpen(true)} className="rounded-md drop-shadow-2xl p-1 h-fit cursor-pointer">
                    <PiDotsThreeVerticalBold size={`1.5rem`} />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem>
                        <AlertDialogTrigger onClick={() => setDialogOpen(true)} className="flex gap-1 items-center cursor-pointer">
                            <PiXCircleBold className="fill-red-400" size={`1.2rem`} />
                            Discharge admin
                        </AlertDialogTrigger>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you sure you want to discharge { admin ? admin?.fullName : '' }
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete { admin ? admin?.fullName : '' }&apos;s account
                        and remove the data from the database.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <LoadingButton loading={ isLoading? true: false } onClick={handleDischarge}>
                    Yes, discharge { admin ? admin?.fullName : '' }
                    </LoadingButton >
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>      
    )
};

