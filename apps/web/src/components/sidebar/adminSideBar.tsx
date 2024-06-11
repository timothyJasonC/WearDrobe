import React from 'react'
import { SupAdmMenu } from './supAdmMenu'

export const AdminSideBar = ({children}: Readonly<{children: React.ReactNode}>) => {
  return (
    <div className="bg-xwhite min-h-screen flex">
       <div className="h-screen flex flex-col max-sm:hidden w-20 lg:w-72 grow-0 shrink-0 sticky top-0 justify-between overflow-y-auto p-10 border-r-2 border-r-gray-200">
          <div>
              <p className='text-base text-gray-500'>Super Admin</p>
              <p className='text-xl truncate font-bold'>Arya Hanif Nugroho</p>
          </div>
          <SupAdmMenu />
          <div>
            <button>Account Settings</button>
          </div>
        
        </div>
        {children}
    </div>
  )
}

