import { Badge } from "@/components/ui/badge"
import { LoadingButton } from "@/components/ui/loading-button"
import { Separator } from "@/components/ui/separator"
import { deleteRequest, patchRequest } from "@/lib/fetchRequests"
import React, { useState } from "react"
import { PiCheckBold, PiPencilSimple, PiTrash } from "react-icons/pi"
import { toast } from "sonner"
import { AddressDialog } from "./AddressDialog"
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { useRouter } from "next/navigation"

export default function AddressCard({ id, labelAddress, coordinate, mainAddress, province, type, city_name, postal_code, userId }: { id: string, labelAddress: string, coordinate: string, mainAddress: boolean, province: string, type: string, city_name: string, postal_code: string, userId: string }) {

    const [ isLoading, setIsLoading ] = useState(false)
    const [ isLoadingDelete, setIsLoadingDelete ] = useState(false)
    const [ openDeleteDialog, setOpenDeleteDialog ] = useState(false)

    async function handleMainAddress() {
        setIsLoading(true)
        try {
            const res = await patchRequest({ id, userId }, 'address/setMainAddress')
            const data = await res.json()
            if (res) setIsLoading(false)
            if (res.ok) {
                toast.success(data.message)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            setIsLoading(false)
            if (error instanceof Error) toast.error(error.message)
            toast.error('Something went wrong, try again later')
        }
    }

    async function handleDeleteAddress() {
        setIsLoadingDelete(true)
        try {
            const res = await deleteRequest(`address/delete/${id}`)
            const data = await res.json()
            if (res) setIsLoadingDelete(false)
            if (res.ok) {
                toast.success(data.message)
            } else {
                toast.error(data.message)
            }
            setOpenDeleteDialog(false)
        } catch (error) {
            setIsLoadingDelete(false)
            if (error instanceof Error) toast.error(error.message)
            toast.error('Something went wrong, try again later')
        }
    }

    return (
        <div className={` border-black/20 w-full rounded-sm relative ${ mainAddress ? 'bg-emerald-100' : 'border-[1px]' }`}>
            <div className="flex justify-between items-center p-4">
                <div className="flex sm:gap-4 gap-0 justify-between items-center w-full sm:w-fit">
                    <h3 className="font-bold tracking-wide">{ labelAddress }</h3>
                    { mainAddress && <Badge className="flex gap-1 font-light items-center"><PiCheckBold className="max-sm:hidden" />Main</Badge> }
                </div>
                { !mainAddress && <LoadingButton onClick={handleMainAddress} loading={isLoading} className="hidden sm:flex gap-2 bg-transparent text-black border-[1px] border-black hover:text-white">Set as main address</LoadingButton> }
            </div>
            <Separator className={`${ mainAddress && 'bg-white' }`} />
            <div className="p-4 text-black/40 flex flex-col h-max gap-4">
                <p>{ coordinate }</p>
                <div className="flex flex-col lg:flex-row justify-between gap-2 lg:gap-0">
                    <span className="text-black/50">{ type } { city_name }, { province },&nbsp;
                        <span className="text-black/70 font-medium">{ postal_code }</span>
                    </span>
                    <div className="flex justify-end items-center gap-4 max-sm:justify-evenly">
                        <AlertDialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
                            <AlertDialogTrigger>
                                <div className="flex gap-1 items-center w-fit text-black/60 cursor-pointer hover:text-red-400 saturate-200">
                                    <PiTrash />
                                    <a>delete <span className="max-sm:hidden">address</span></a>
                                </div>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you sure you want to delete<span className="underline">&nbsp;{ labelAddress }&nbsp;</span>?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete your
                                        address and remove the data from our database.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <LoadingButton onClick={handleDeleteAddress} loading={isLoadingDelete} className="flex gap-2"><PiTrash />Delete { labelAddress }</LoadingButton>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                        <Separator className={`h-4 ${ mainAddress && 'bg-white' }`} orientation="vertical" />
                        <AddressDialog btnText={"Update Address"} editAddress={true} id={id}>
                            <div className="flex gap-1 items-center w-fit text-black/60 cursor-pointer hover:text-black saturate-200">
                                <PiPencilSimple />
                                <a>edit <span className="max-sm:hidden">address</span></a>
                            </div>
                        </AddressDialog>
                    </div>
                </div>
                { !mainAddress && 
                    <div className="sm:hidden flex justify-end">
                        <LoadingButton onClick={handleMainAddress} loading={isLoading} className="w-full flex gap-2 bg-transparent text-black border-[1px] border-black hover:text-white">Set as main address</LoadingButton>
                    </div>
                }
                
            </div>
        </div>
    )
};

