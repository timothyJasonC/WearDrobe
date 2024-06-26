'use client'
import React, { useEffect, useState } from 'react'
import { GenderDropdown } from './genderDropdown'
import { CatAccordion } from './catAccordion'
import { useSearchParams } from 'next/navigation'

interface IActiveCat {
  g:string, c:string
}

export const CatalogSidebar = () => {
  const params= useSearchParams()
  const [gender, setGender] = useState('Select')
  const [activeCat, setActiveCat] = useState<IActiveCat>({g:'', c:''})
  
  useEffect(() => {
    const c = params.get('c')
    const g = params.get('g')
    if (g) setGender(g.charAt(0).toUpperCase() + g.slice(1))
      if (!g) setGender('Select')
    if (c && g) {
      setActiveCat({c, g})
    }
    if (!g || !c) {
      setActiveCat({c:'', g:''})
    }
  }, [params])
  
  return (
    <div className='max-lg:hidden lg:min-w-[16rem] xl:min-w-[18rem] h-fit border-[1px] border-black/15  p-5 sticky top-32 mb-36'>
        <p>Select gender:</p>
        <GenderDropdown 
            gender={gender}
            setGender={setGender}
            genderList={['Select', 'Men', 'Women', 'Unisex']}
        />
        <CatAccordion
        gender={gender}
        activeCat={activeCat!}
        />


    </div>
  )
}
