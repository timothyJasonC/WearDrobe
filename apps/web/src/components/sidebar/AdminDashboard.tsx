import React from 'react'
import { getAdminServerSide } from '@/lib/utils'
import { cookies } from 'next/headers'
import { AdminSideBar } from './AdminSideBar'

export const AdminDashboard = async ({children}: Readonly<{children: React.ReactNode}>) => {
    const admin = await getAdminServerSide(cookies)
    
    return (
        <div className="bg-white min-h-screen flex">
            <AdminSideBar admin={admin} />
            {children}
        </div>
    )
}

