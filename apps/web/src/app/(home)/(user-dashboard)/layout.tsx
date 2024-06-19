'use client'
import Image from 'next/image';
import '../../globals.css';
import { PiSealCheckFill, PiUserCircle, PiUserCircleThin } from 'react-icons/pi';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ToolTip } from '@/components/Tooltip';

export default function Layout({children}: Readonly<{children: React.ReactNode}>) {

    const pathname = usePathname()
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

    return (
        <div className='flex justify-center py-20'>
            <div className='flex flex-col lg:flex-row std-max-w w-full p-4 gap-5'>
                <div className='flex flex-col gap-10 lg:w-[25%] w-full border-[1px] border-black/15 p-5'>
                    {/* dynamic list */}
                    <div className='flex items-center flex-col gap-2'>
                        <div className=''>
                            {
                                dummyImg ? 
                                <div className='relative'>
                                    <Image priority className='w-40 h-40 object-cover object-top rounded-full' width={400} height={400} src={dummyImg} alt={''} />
                                    <ToolTip className='absolute right-1 bottom-1 w-auto cursor-pointer' content={<span>Your account has been verified!</span>} >
                                        <PiSealCheckFill className='fill-[#2a9ef0]' size={'2rem'} />
                                    </ToolTip>
                                </div>
                                :
                                <PiUserCircleThin className='w-full h-full bg-[#dadde2] fill-white' />
                            }
                        </div>
                        <div className='text-center'>
                            <h2 className='text-lg font-semibold'>Username</h2>
                            <p className='text-black/60'>blablabla@email.com</p>
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
                <div className='lg:w-[75%] w-full h-fit border-y-[1px] border-[1px] border-black/15 p-4'>
                    {children}
                </div>
            </div>
        </div>
    );
}
