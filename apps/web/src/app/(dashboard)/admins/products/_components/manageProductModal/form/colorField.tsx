import React from 'react'
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"

import { ColorDialog } from './colorDialog'
import { ColorTable } from './colorTable'

export const ColorField = ({form, setColor, color, invalidColor}:{form:any, setColor:any, color:any, invalidColor:any}) => {
  return (
    <div className=''>
      <FormField
        control={form.control}
        name="colorArray"
        render={() => (
          <FormItem>
            <div className=''>
              <FormLabel className="font-bold text-base">Color Variants</FormLabel>
            </div>
            <FormControl>
              
              <ColorDialog 
              setColor={setColor}
              color={color}
              />

            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <ColorTable
      color={color}
      setColor={setColor}
      />

      <div className={`text-red-500 text-sm font-medium mt-2 ${invalidColor && color.length == 0 ? "block" : "hidden"}`}>color variant cannot be empty.</div>
    </div>
  )
}
