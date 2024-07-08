'use client'
import React, { useEffect, useState } from "react"
import { PiCheckBold, PiUserCircleThin, PiWarningCircle, PiXBold } from 'react-icons/pi';
import { usePathname } from 'next/navigation';
import { ToolTip } from '@/components/Tooltip';
import Link from 'next/link';
import Image from 'next/image';
import { IUser } from "../user/edit-profile/_components/EditProfileForm";
import { InputPhotoProfile } from "../user/edit-profile/_components/InputPhotoProfile";
import { LoadingButton } from "@/components/ui/loading-button";
import { Button } from "@/components/ui/button";
import useStorage from "@/hooks/useStorage";
import { deleteRequest, getRequest, patchRequest } from "@/lib/fetchRequests";
import { toast } from "sonner";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { getUserClientSide } from "@/lib/utils";

export default function UserMenu({ className, user }: { className?: string, user: IUser | null }) {
    const pathname = usePathname()
    const [file, setFile] = useState<File | null>(null);
    const [ isLoading, setIsloading ] = useState(false)
    const [ open, setOpen ] = useState(false)
    const [ currentUser, setCurrentUser ] = useState(user)
    const [ currentPhotoProfile, setCurrentPhotoProfile ] = useState<any>(user?.imgUrl);
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
            text: 'Order History',
            href: '/user/transaction'
        },
    ]

    async function handleChangePhoto() {
        if (user) {
            setIsloading(true)
            try {
                let imgUrl: string = ''
                if (file) imgUrl = await uploadFile(file, 'profile')
                const res = await patchRequest({ imgUrl: imgUrl }, `user/${user.id}`)
                const data = await res.json()
                if (res) setIsloading(false)
                if (res.ok) {
                    setFile(null)
                    toast.success('Photo profile has been updated')
                    const res = await (await getRequest(`user/${user.id}`)).json()
                    const currentUser = res.data
                    setCurrentPhotoProfile(currentUser.imgUrl)
                } else if (res.status == 404) {
                    toast.error('User not found!')
                } else toast.error(data.message)
            } catch (error) {
                toast.error('Server error')
            }
        }
    }

    async function handleRemovePhotoProfile(){
        if (user) {
            setIsloading(true)
            const res = await (await deleteRequest(`user/${user.id}`)).json()
            try {
                if (res) setIsloading(false)
                if (res.status == 'ok') {
                    toast.success(res.message)
                    const response = await (await getRequest(`user/${user.id}`)).json()
                    const currentUser = response.data
                    setCurrentPhotoProfile(currentUser.imgUrl)
                    setOpen(false)
                } else {
                    toast.error(res.message)
                }
            } catch (error) {
                setIsloading(false)
                toast.error(res.message)
            }
        }
    }

    useEffect(() => {
        async function refreshUser() {
            const user = await getUserClientSide(); setCurrentUser(user)
        }
        refreshUser()
    }, [ currentPhotoProfile ])

    function showDeleteBtn() {
        const trashIcon = document.getElementById('trash-icon') as HTMLElement;
        trashIcon?.classList.add('right-2')
        trashIcon?.classList.add('opacity-100')
        trashIcon?.classList.remove('right-12')
        trashIcon?.classList.remove('opacity-0')
    }

    function hideDeleteBtn() {
        const trashIcon = document.getElementById('trash-icon') as HTMLElement;
        trashIcon?.classList.remove('right-2')
        trashIcon?.classList.remove('opacity-100')
        trashIcon?.classList.add('right-12')
        trashIcon?.classList.add('opacity-0')
    }

    return (
        <div className={`${className}`}>
            <div className="flex justify-center">
                <div className='flex items-center flex-col gap-2 relative w-fit'>
                    <div onMouseEnter={showDeleteBtn} onMouseLeave={hideDeleteBtn} className='group w-40 h-40 rounded-full flex justify-center items-center relative overflow-hidden'>
                        {
                            user && currentUser?.imgUrl ? 
                                file ? 
                                <div className="">
                                    <Image priority className='object-cover object-top rounded-full h-[160px] w-[160px]' width={400} height={400} src={URL.createObjectURL(file)} alt={''} />
                                </div>
                                :
                                <div className="">
                                    <Image priority className='object-cover object-top rounded-full h-[160px] w-[160px]' width={400} height={400} src={currentUser.imgUrl} alt={''} />
                                </div>
                            :
                            file ?
                            <div className="">
                                <Image priority className='object-cover object-top rounded-full h-[160px] w-[160px]' width={400} height={400} src={URL.createObjectURL(file)} alt={''} />
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
                            <LoadingButton loading={ isLoading ? true : false } onClick={handleChangePhoto} className="rounded-lg flex items-center gap-1 py-1 px-3"><PiCheckBold />confirm</LoadingButton>
                        </div>
                    }
                    
                    <div className="absolute -right-0 -bottom-0 w-auto cursor-pointer">
                        { user && !user?.accountActive && <ToolTip className='' content={<span>Your account hasn&apos;t been verified!</span>} ><PiWarningCircle className='fill-yellow-400 z-10 absolute bottom-14 right-8' size={'1.2rem'} /> </ToolTip> }
                    </div>
                    <div onMouseEnter={showDeleteBtn} onMouseLeave={hideDeleteBtn} id="trash-icon" className="absolute right-12 bottom-[12rem] w-auto cursor-pointer duration-200 opacity-0">
                            <AlertDialog open={open}>
                                <AlertDialogTrigger asChild onClick={() => {setOpen(true); hideDeleteBtn() }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-[1rem] fill-black/60" viewBox="0 0 16 16">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                                    </svg>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                    <AlertDialogTitle>Are you sure you want to delete photo profile?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        The action cannot be undone. This will permanently delete your
                                        photo profile from the database.
                                    </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel onClick={() => setOpen(false)}>Cancel</AlertDialogCancel>
                                        <LoadingButton loading={ isLoading ? true : false } onClick={handleRemovePhotoProfile} className="bg-red-500">
                                            Delete Photo Profile
                                        </LoadingButton>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                    </div>
                    <div className='text-center'>
                        <h2 className='text-lg font-semibold'>{ user?.username }</h2>
                        <p className='text-black/60'>{ user?.email }</p>
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

