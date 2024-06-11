import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { PiPlusBold } from "react-icons/pi";
import { CategoryForm } from "./createCategoryForm";

export function CreateCategoryPopover({type, gender, getCategoryData}:{type:string, gender:string, getCategoryData: () => void }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className='flex items-center gap-1 font-semibold text-xs justify-center mr-3 bg-gray-100 rounded-sm p-1 cursor-pointer mb-2'>
          <p>Create category</p>
          <PiPlusBold/> 
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-80"  align="start" side="right">
          
          <CategoryForm 
          gender={gender}
          type={type}
          getCategoryData={getCategoryData}
          />          
      </PopoverContent>
    </Popover>
  )
}
