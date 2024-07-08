'use client'

import { StatisticsCard } from '@/app/(dashboard)/_components/statisticsCard'
import { WarehouseDropdown } from '@/app/(dashboard)/_components/warehouseDropdown'
import { getProduct, getWarehouse } from '@/app/action'
import { IWarehouse } from '@/constants'
import { getAdminClientSide } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { setTimeout } from 'timers'
import { PiCaretCircleLeft } from "react-icons/pi";
import { Button } from '@/components/ui/button'
import { MutationTabs } from './_components/tabs'
import Link from 'next/link'

export default function Mutation() {
  const router = useRouter()
  const [selectedWH, setSelectedWH] = useState('')
  const [warehouseList, setWarehouseList] = useState<IWarehouse[]>([])
  const [isSuper, setIsSuper] = useState(false)
  
  
  const getAdmWH = async() => {
    const admin = await getAdminClientSide()
    const warehouse = await getWarehouse(admin.id)
    setWarehouseList(warehouse)
    if (admin.role == 'warAdm') {
      setSelectedWH(warehouse[0].warehouseName)
    } else if (admin.role == 'superAdm') {
      toast.error('You are not authorized.')
      setTimeout(() => {
        router.push('/admins/stocks')
    }, 1000)
      
    }
  }

  useEffect(() => {
    getAdmWH()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <div className='flex flex-col w-full min-h-screen py-10 px-10 md:px-20'>
      
      <div className='flex w-full mb-7 items-center max-sm:flex-col gap-y-7'>
        <div className='w-full flex items-center gap-0'>
          <Button variant={'ghost'} className='w-5 max-sm:h-5 sm:w-10 p-0'>
            <Link href={'/admins/stocks/'} >
              <PiCaretCircleLeft className='text-xs sm:text-3xl'/>
            </Link>
          </Button>
          <h1 className='text-xl sm:text-4xl font-medium'>Manage Mutations</h1>
        </div>
        <div className='flex flex-col w-full items-end mb-7'>
            <p className='text-xl'>Warehouse</p>
            <WarehouseDropdown 
                selectedWH={selectedWH}
                setSelectedWH={setSelectedWH}
                warehouseList={warehouseList}
                isSuper={isSuper}
            />
        </div>
      </div>

      <MutationTabs selectedWH={selectedWH}/>


    </div>
  )
}
