import React from 'react'
import { getAdminServerSide } from '@/lib/utils'
import { cookies } from 'next/headers'
import { AdminSideBar } from './adminSideBar'

export const AdminDashboard = async ({children}: Readonly<{children: React.ReactNode}>) => {
    const admin = await getAdminServerSide(cookies)
    
    return (
        <div className="bg-white h-screen flex">
            <AdminSideBar admin={admin} />
            {children}
        </div>
    )
}

