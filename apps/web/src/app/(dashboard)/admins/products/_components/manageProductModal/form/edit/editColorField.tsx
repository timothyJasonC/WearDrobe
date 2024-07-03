import React from 'react'
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"

import { EditColorDialog } from './editColorDialog'
import { EditColorTable } from './editColorTable'
import { IEditColor } from '@/constants'


export const EditColorField = ({setColor, color, invalidColor}:{setColor:React.Dispatch<React.SetStateAction<IEditColor[]>>, color:IEditColor[], invalidColor:boolean}) => {
  return (
    <div className=''>
      <FormField
        name="colorArray"
        render={() => (
          <FormItem>
            <div className=''>
              <FormLabel className="font-bold text-base">Color Variants</FormLabel>
            </div>
            <FormControl>
              
              <EditColorDialog 
              setColor={setColor}
              color={color}
              />

            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <EditColorTable
      color={color}
      setColor={setColor}
      />

      <div className={`text-red-500 text-sm font-medium mt-2 ${invalidColor || color.every((item:IEditColor) => item.isDeleted === true) ? "block" : "hidden"}`}>color variant cannot be empty.</div>
    </div>
  )
}
