import { getUserServerSide } from '@/lib/utils';
import '../../globals.css';
import { cookies } from 'next/headers';
import UserMenu from './_components/UserMenu';
import { Toaster } from 'sonner';

export default async function Layout({children}: Readonly<{children: React.ReactNode}>) {
    const user = await  getUserServerSide(cookies);

    return (
        <div className='flex justify-center py-20'>
            <div className='flex flex-col lg:flex-row std-max-w-2 w-full p-4 gap-5'>
                <div className='lg:w-[25%] w-full border-[1px] border-black/15 p-5'>
                    <UserMenu className='flex flex-col gap-10' user={user} />
                    <Toaster position="top-center" richColors />
                </div>
                <div className='lg:w-[75%] w-full h-fit border-y-[1px] border-[1px] border-black/15 p-4'>
                    {children}
                </div>
            </div>
        </div>
    );
}
