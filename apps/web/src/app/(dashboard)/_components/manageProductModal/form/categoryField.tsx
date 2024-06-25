import React from 'react'
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
  import { Input } from "@/components/ui/input"
import { Selector } from '../selector'

interface ICategory {
    id?: string
    category?: string
  }

interface ICategoryForm {
  category:string,
  invalidCategory:any,
  setGender:React.Dispatch<React.SetStateAction<string>>,
  gender:any,
  type:string,
  setType:React.Dispatch<React.SetStateAction<string>>,
  setCategory: React.Dispatch<React.SetStateAction<string>>,
  categoryList:ICategory[]
}

export const CategoryField = ({setGender, gender, type, setType, setCategory, categoryList, invalidCategory, category}:ICategoryForm) => {
  return (
    <FormField
      name="category"
      render={() => (
        <FormItem>
          <FormLabel className="font-bold text-base">Category</FormLabel>
            <FormControl>
              <div>
                <div className='flex gap-2 items-center max-sm:flex-col'>                   
                    <Selector
                      defValue={gender}
                      label='Gender'
                      state={["Men", "Women", "Unisex"]}
                      setState={setGender}
                    />
                    <Selector 
                      defValue={type}
                      label='Type'
                      state={gender ? ["Tops", "Bottoms", "Accessories"] : []}
                      setState={setType}
                    />
                    <Selector 
                      defValue={category}
                      label="Category"
                      state={(categoryList.length > 0 ? categoryList : [])}
                      setState={setCategory}
                    />
                </div>
                <div className={`text-red-500 text-sm font-medium mt-2 ${invalidCategory && !category ? "block" : "hidden"}`}>category cannot be empty.</div>
              </div>
            </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
