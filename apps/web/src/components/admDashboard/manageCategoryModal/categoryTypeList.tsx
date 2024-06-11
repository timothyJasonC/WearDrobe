'use client'
import React, { useEffect, useState } from 'react'
import { ManageCategoryDropdown } from './categoryGenderDropdown';
import { PiPersonArmsSpreadFill } from "react-icons/pi";
import { CategoryAccordion } from './categoryTypeAccordion';
import { getCategory } from '@/app/action';

import { ScrollArea } from "@/components/ui/scroll-area"

interface ICategory {
  id?: string
  category?: string
}

interface IType {
  tops?: ICategory[]
  bottoms?: ICategory[]
  accessories?: ICategory[]
}

export const ManageCategoryList = () => {
    const genderOptions = ['Men', 'Women', 'Unisex']
    const [gender, setGender] = useState("Men")
    const [type, setType] = useState<IType>({})

    const getCategoryData = async(gender:string) => {
      try {
        const data = await getCategory(gender, '')
        setType(data)
                
      } catch (error) {
        console.log(error);
      }
    }

    useEffect(() => {
      getCategoryData(gender)
    }, [gender])

    
  return (
    <div>
      <div className='flex w-full justify-end mb-4'>

        <ManageCategoryDropdown
        state={gender}
        setState={setGender}
        options={genderOptions}
        icon={PiPersonArmsSpreadFill}
        />
      </div>
      
      <ScrollArea className="h-[450px] w-full">
        <CategoryAccordion
        type={'Tops'}
        gender={gender}
        data={type.tops || []}
        getCategoryData={() => getCategoryData(gender)}
        />

        <CategoryAccordion
        type={'Bottoms'}
        gender={gender}
        data={type.bottoms || []}
        getCategoryData={() => getCategoryData(gender)}
        />

        <CategoryAccordion
        type={'Accessories'}
        gender={gender}
        data={type.accessories || []}
        getCategoryData={() => getCategoryData(gender)}
        />
      </ScrollArea>
      </div>
    )
}
