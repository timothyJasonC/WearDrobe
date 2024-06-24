'use client'
import React from "react"
import { PiSealCheckFill, PiUserCircleThin, PiWarningCircle, PiWarningFill } from 'react-icons/pi';
import { usePathname } from 'next/navigation';
import { ToolTip } from '@/components/Tooltip';
import Link from 'next/link';
import Image from 'next/image';
import { IUser } from "../user/edit-profile/_components/EditProfileForm";
import { useAppSelector } from "@/lib/redux/hooks";

export default function UserMenu({ className, user }: { className?: string, user: IUser }) {
    const pathname = usePathname()
    const newProfile = useAppSelector((state) => state.profile.value)
    console.log(newProfile)
    
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
            href: '/user/transaction'
        },
    ]
    const dummyImg = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

    return (
        <div className={`${className}`}>
            <div className="flex justify-center">
                <div className='flex items-center flex-col gap-2 relative w-fit'>
                    <div className='w-40 h-40 rounded-full overflow-hidden'>
                        {
                            user.imgUrl ? 
                            <div>
                                <Image priority className='object-cover object-top rounded-full' width={400} height={400} src={user.imgUrl} alt={''} />
                            </div>
                            :
                            <div>
                                <PiUserCircleThin className='w-full h-full bg-[#dadde2] fill-white' />
                            </div>
                        }
                    </div>
                    <div className="absolute right-1 bottom-1 w-auto cursor-pointer">
                        {
                            user.accountActive ?
                                <ToolTip className='' content={<span>Your account hasn't been verified!</span>} >
                                    <PiSealCheckFill className='fill-[#2a9ef0] z-10 absolute bottom-14 right-8' size={'2rem'} /> 
                                </ToolTip>
                            :
                                <ToolTip className='' content={<span>Your account has been verified!</span>} >
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

