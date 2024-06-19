import React from 'react'

export const StatisticsCard = ({title, number, modalElement}:{title:string, number:number, modalElement?: React.ReactNode}) => {
  return (
    <div className='flex flex-col max-sm:items-center min-w-28 lg:min-w-72 flex-1 rounded-xl shadow-[0px_0px_6px_-2px_rgba(0,0,0,0.5)] max-sm:p-2 sm:py-5 sm:px-10'>
            <p className='text-base sm:text-xl lg:text-2xl'>{title}</p>
            <div className='flex max-sm:flex-col justify-between items-center'>
              <p className='text-3xl sm:text-5xl lg:text-7xl text-red-500'>{number}</p>
              {modalElement}
            </div>
          </div>
  )
}
