import React, { Dispatch, SetStateAction } from "react"
import DashboardWrapper from "../../_components/DashboardWrapper"
import { getRequest, patchRequest } from "@/lib/fetchRequests"
import Image from "next/image"
import { PiArrowLeft, PiGenderFemaleBold, PiGenderMaleBold, PiUserCircleThin } from "react-icons/pi"
import { ToolTip } from "@/components/Tooltip"
import Link from "next/link"
import DischargeBtn from "./_components/DischargeBtn"
import EditableInput from "./_components/EditableInput"
import { catchError, isValidEmail, parseDate } from "@/lib/utils"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import ActiveIndicator from "@/components/sidebar/ActiveIndicator"

export default async function Page({ params }: { params: { id: string } }) {

    const res = await (await getRequest(`/admin/${params?.id}`)).json()
    const admin = res.data
    const warehouseRes = await (await getRequest(`/warehouses/assigned-warehouse/${admin?.id}`)).json();
    const assignedWarehouse = warehouseRes.data;
    
    async function handleEmail(email: string) {
        'use server'
        const isValid = isValidEmail(email)
        try {
            if (isValid) {
                if (email == admin.email) {
                    return { success: { message: "Email didn't change" } };
                } else {
                    const res = await (await patchRequest({ email: email }, `/admin/email/${admin.id}`)).json()
                    return { success: res };
                }
            } else {
                return { error: { message: "Email not valid" } };
            }
        } catch (error) {
            catchError(error)
        }
    }

    async function handleFullName(fullName: string) {
        'use server'
        try {
            if (fullName.length > 5) {
                if (fullName.trim() == admin.fullName) {
                    return { success: { message: "Full Name didn't change" } };
                } else {
                    const res = await (await patchRequest({ fullName }, `/admin/name/${admin.id}`)).json()
                    return { success: res };
                }
            } else return { error: "Full Name must be at least 6 characters" }
        } catch (error) {
            catchError(error)
        }
    }

    async function handleDate(date: any) {
        'use server'
        try {
            console.log(date)
        } catch (error) {
            catchError(error)
        }
    }

    return (
        <DashboardWrapper>
            <Link href={`/admins/admins`} className="mb-8 flex gap-2 items-center text-black/60 hover:text-black duration-200 w-fit">
                <PiArrowLeft className="cursor-pointer hover:fill-black" size={`1.2rem`} />
                Back to admin page
            </Link>
            {
                admin ?
                    <div className=" h-full flex flex-col gap-20">

                        <div className="flex justify-between p-4 gradient rounded-lg border-2 relative">

                            <div className="flex flex-col lg:flex-row gap-10 items-start w-full">

                                <div className="lg:w-52 w-40 h-40 rounded-lg overflow-hidden flex items-center">
                                    
                                    {
                                        admin.imgUrl ? 
                                        <>
                                            <Dialog>
                                                <DialogTrigger>
                                                    <ToolTip className='' content={`preview image`} >
                                                        <Image priority width={300} height={300} className="object-cover" src={admin.imgUrl} alt={""} />
                                                    </ToolTip>
                                                </DialogTrigger>
                                                <DialogContent className="h-full">
                                                    <Image priority fill style={{objectFit:"cover"}} src={admin.imgUrl} alt={""} />
                                                </DialogContent>
                                            </Dialog>
                                        </>
                                        :
                                        <PiUserCircleThin className='w-full h-full bg-[#dadde2] fill-white' />
                                    }
                                </div>
                                <div className="flex flex-col gap-[2rem] w-full ">
                                    <div className="">
                                        <div className="text-black/60 flex items-center gap-2">
                                            <ActiveIndicator isActive={admin && admin.accountActive ? true : false} activeText={"Admin is verified"} nonActiveText={"Admin is NOT verified"} />
                                            Warehouse Admin
                                        </div>
                                        <div className="flex gap-1">
                                            <EditableInput 
                                                hoverText="Full Name"
                                                data={admin && admin} defValue={admin && admin.fullName ? admin.fullName : ''} 
                                                inputType={"text"} handleFunc={handleFullName}                                        
                                            >
                                                <h3 className="font-bold text-3xl cursor-pointer select-none">{admin ? admin.fullName : ''}</h3>
                                            </EditableInput>
                                            {
                                                admin.gender == 'MALE' ?
                                                <PiGenderMaleBold className="fill-blue-400" />
                                                :
                                                <PiGenderFemaleBold className="fill-pink-400" />
                                            }
                                        </div>
                                        <div className="text-black/60 flexflex-col lg:flex-row">
                                            <span className="text-black font-semibold">Admin ID: </span>
                                            <span><span className="lg:hidden">&nbsp;</span>{admin.id}</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col sm:flex-row justify-between lg:items-center">
                                        <div>
                                            <div className="text-black/60 flex lg:items-center items-start flex-col lg:flex-row lg:py-2 ">
                                                <EditableInput 
                                                    hoverText="Email"
                                                    handleFunc={handleEmail}
                                                    classNameHead="w-40" data={admin} head={"Email"}
                                                    defValue={admin.email} inputType={"email"}/>
                                            </div>
                                            <div className="text-black/60 flex lg:items-center items-start flex-col lg:py-2 lg:flex-row">
                                                <span className="text-black font-semibold w-40">Assign: </span>
                                                <span className="flex items-center">
                                                    <span className="hidden lg:block">&nbsp;</span>
                                                    {
                                                        assignedWarehouse ? 
                                                            <Link className="underline underline-offset-2" href={`/admins/warehouses/${assignedWarehouse.id}`}>
                                                                <ToolTip className='' content={`Click to see Warehouse ${ assignedWarehouse.warehouseName }`} >
                                                                    <span>{ assignedWarehouse.warehouseName } -</span>
                                                                    <span className="font-semibold">&nbsp;{ assignedWarehouse.province }</span>
                                                                </ToolTip>
                                                            </Link>
                                                        :
                                                            <span>-</span>
                                                    }
                                                </span>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-black/60 flex items-start lg:items-center select-none flex-col lg:flex-row lg:py-2">
                                                <span className="text-black font-semibold w-40">Registered at: </span>
                                                <span className="flex items-center">
                                                    <span className="hidden lg:block">&nbsp;</span>
                                                    { new Date(admin.createdAt).toLocaleDateString() }
                                                </span>
                                            </div>
                                            <div className="text-black/60 flex items-start lg:items-center flex-col lg:py-2 lg:flex-row">
                                                <span className={`text-black font-semibold w-40`}>Date of Birth:</span>
                                                <span className="select-none flex items-center">
                                                    <span className="hidden lg:block">&nbsp;</span>
                                                    { parseDate(admin.dob) }
                                                </span>
                                                    {/* <EditableInput classNameHead="w-40 py-2" data={admin} head={"Date of Birth"} 
                                                        defValue={admin.dob} inputType={"date"} handleFunc={handleDate}
                                                    /> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="absolute right-4">
                                <DischargeBtn admin={admin} />
                            </div>
                        </div>

                    </div>
                :
                    <div>
                        Admin not found.
                    </div>
            }
        </DashboardWrapper>
    )
};

