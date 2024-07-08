import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"


export default function LoadingCatalog() {
  return (
        <div className='w-40 h-[280px] sm:w-60 sm:h-[25rem] items flex flex-col'>
            <Skeleton className="w-40 h-40 sm:w-60 sm:h-60 rounded-md" />
            <div className='flex flex-col grow pt-0 pb-3 sm:pb-4'>
            <div className='flex justify-between my-2'>
                <Skeleton className="w-full h-3 rounded-md" />
                <Skeleton className="w-full h-3 rounded-md" />
            </div>

            <div className='flex justify-start gap-1'>
                <Skeleton className='w-5 h-3'/>
                <Skeleton className='w-3 h-3'/>
                <Skeleton className='w-5 h-5'/>
            </div>
            
            <div className='flex flex-col justify-between grow mt-2'>
                <Skeleton className='w-full h-5'/>
                <Skeleton className='w-[50%] h-5'/>
            </div>
            </div>
        </div>
  )
}
