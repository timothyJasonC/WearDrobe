'use client'
import React, { useEffect, useState } from "react"
import { PiCheckBold, PiSealCheckFill, PiUserCircleThin, PiWarningFill, PiXBold } from 'react-icons/pi';
import { usePathname } from 'next/navigation';
import { ToolTip } from '@/components/Tooltip';
import Link from 'next/link';
import Image from 'next/image';
import { IUser } from "../user/edit-profile/_components/EditProfileForm";
import { InputPhotoProfile } from "./InputPhotoProfile";
import { LoadingButton } from "@/components/ui/loading-button";
import { Button } from "@/components/ui/button";
import useStorage from "@/hooks/useStorage";
import { getRequest, patchRequest } from "@/lib/fetchRequests";
import { toast } from "sonner";

export default function UserMenu({ className, user }: { className?: string, user: IUser }) {
    const pathname = usePathname()
    const [file, setFile] = useState<File | null>(null);
    const [ currentPhotoProfile, setCurrentPhotoProfile ] = useState<any>(user.imgUrl);
    const { uploadFile } = useStorage()
    
    const profileLinks = [
        {
            text: 'Edit Profile',
            href: '/user/edit-profile'
        },
        {
            text: 'Manage Address',
            href: '/user/manage-address'
        },
        {
            text: 'Change Password',
            href: '/user/change-password'
        },
    ]
    const shoppingLinks = [
        {
            text: 'Wishlist',
            href: '/user/wishlist'
        },
        {
            text: 'Cart',
            href: '/user/cart'
        },
        {
            text: 'Order History',
            href: '/user/order-history'
        },
    ]
    const dummyImg = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

    async function handleChangePhoto() {
        try {
            let imgUrl: string = ''
            if (file) imgUrl = await uploadFile(file)
            const res = await patchRequest({ imgUrl: imgUrl }, `/user/${user.id}`)
            if (res.ok) {
                setFile(null)
                toast('Photo profile has been updated')
                const res = await (await getRequest(`/user/${user.id}`)).json()
                const data = res.data
                setCurrentPhotoProfile(data.imgUrl)
            } else if (res.status == 404) {
                toast.error('User not found!')
            } else {
                toast.error('Server error')
            }
        } catch (error) {
            toast.error('Server error')
        }
    }

    useEffect(() => {
        if (file) setCurrentPhotoProfile(URL.createObjectURL(file))
    }, [ currentPhotoProfile ])

    return (
        <div className={`${className}`}>
            <div className="flex justify-center">
                <div className='flex items-center flex-col gap-2 relative w-fit'>
                    <div className='group w-40 h-40 rounded-full flex justify-center items-center relative overflow-hidden'>
                        {
                            user && user.imgUrl ? 
                                file ? 
                                <div className="">
                                    <Image priority className='object-cover object-top rounded-full h-[160px] w-[160px]' width={400} height={400} src={currentPhotoProfile} alt={''} />
                                </div>
                                :
                                <div className="">
                                    <Image priority className='object-cover object-top rounded-full h-[160px] w-[160px]' width={400} height={400} src={user.imgUrl} alt={''} />
                                </div>
                            :
                            file ?
                            <div className="">
                                <Image priority className='object-cover object-top rounded-full h-[160px] w-[160px]' width={400} height={400} src={currentPhotoProfile} alt={''} />
                            </div>
                            :
                            <PiUserCircleThin className='w-full h-full bg-[#dadde2] fill-white' />
                        }
                        <ToolTip className='w-full h-full absolute hover:bg-black/50 hover:opacity-100 opacity-0 duration-100' content={<span className="text-black/70">
                            <span className="font-semibold text-black">Preferable: &nbsp;</span>
                                Square orientation, 1MB max file size.
                            </span>} >
                            <InputPhotoProfile setFile={setFile}/>
                        </ToolTip>
                    </div>

                    {
                        file &&
                        <div className="absolute -top-12 flex gap-5">
                            <Button onClick={() => setFile(null)} className="rounded-lg flex items-center gap-1 py-1 px-3 bg-slate-50 text-slate-800 border-2 border-slate-800 hover:bg-white"><PiXBold />cancel</Button>
                            <LoadingButton onClick={handleChangePhoto} className="rounded-lg flex items-center gap-1 py-1 px-3"><PiCheckBold />confirm</LoadingButton>
                        </div>
                    }
                    
                    <div className="absolute right-1 bottom-1 w-auto cursor-pointer">
                        {
                            user.accountActive ?
                                <ToolTip className='' content={<span>Your account has been verified!</span>} >
                                    <PiSealCheckFill className='fill-[#2a9ef0] z-10 absolute bottom-14 right-8' size={'2rem'} /> 
                                </ToolTip>
                            :
                                <ToolTip className='' content={<span>Your account hasn't been verified!</span>}  >
                                    <PiWarningFill className='fill-yellow-400 z-10 absolute bottom-14 right-8' size={'2rem'} /> 
                                </ToolTip>
                        }
                    </div>
                    <div className='text-center'>
                        <h2 className='text-lg font-semibold'>{ user.username }</h2>
                        <p className='text-black/60'>{ user.email }</p>
                    </div>
                </div>
            </div>
            <div>
                <div className='flex flex-col gap-2'>
                    {
                        shoppingLinks.map((link, idx) => {
                            const isActive = pathname.startsWith(link.href)
                            return <Link className={` ${ isActive ? 'bg-black text-white' : 'text-black/60 hover:text-black' } pl-1 py-[2px] rounded-sm cursor-pointer duration-200`} href={link.href} key={idx}>{link.text}</Link>
                        })
                    }
                </div>
            </div>
            <div>
                <div className='flex flex-col gap-2'>
                    {
                        profileLinks.map((link, idx) => {
                            const isActive = pathname.startsWith(link.href)
                            return <Link className={` ${ isActive ? 'bg-black text-white' : 'text-black/60 hover:text-black' } pl-1 py-[2px] rounded-sm cursor-pointer duration-200`} href={link.href} key={idx}>{link.text}</Link>
                        })
                    }
                </div>
            </div>
        </div>
    )
};

