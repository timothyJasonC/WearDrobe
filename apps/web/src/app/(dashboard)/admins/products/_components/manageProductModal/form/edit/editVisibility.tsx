import React from 'react'
import { Label } from '@radix-ui/react-label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'


interface IVisibility {
    isVisible: boolean
    setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export const Visibility = ({isVisible, setIsVisible}: IVisibility) => {
  return (
    <div>
        <Label className="font-bold text-base block mb-2">Product Visibility</Label>
          <Select value={isVisible ? 'visible' : 'hidden'}  onValueChange={(value) => setIsVisible(value == 'visible' ? true : false)}>
            <SelectTrigger 
            className={`focus:ring-transparent  focus-visible:border-[1px] focus-visible:border-black border-none text-xs truncate w-36 rounded-full font-semibold
              ${isVisible? "bg-green-200 sm:hover:bg-green-100" : "bg-gray-100 sm:hover:bg-gray-50"} text-black transition-colors h-7`}
              >
              <SelectValue placeholder={"Update Type"}/>
            </SelectTrigger>
            <SelectContent>
                  <SelectItem value={'visible'} >
                    <div className="flex items-center gap-2 text-xs font-semibold text-green-700">
                      <p>Visible</p>
                    </div>
                  </SelectItem>
                  <SelectItem value={'hidden'} >
                    <div className="flex items-center gap-2 text-xs font-semibold text-gray-700">
                      <p>Hidden</p>
                    </div>
                  </SelectItem>
            </SelectContent>
          </Select>
    </div>
  )
}
