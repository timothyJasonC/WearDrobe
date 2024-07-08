import * as React from "react"
import { PiWarehouseDuotone } from "react-icons/pi";
import { PiGlobeHemisphereWestDuotone } from "react-icons/pi";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator";

export function Selector({label, state, defValue, setState, disabled, width}:{label:string, state:any, defValue?:string, setState:any, disabled?:boolean, width?:string}) {   
  return (
    <Select value={defValue} onValueChange={(value) => { if (state.length > 0) setState(value)}} disabled={disabled ? disabled : state.length == 0 ? true : false}>
      <SelectTrigger className={`focus:ring-transparent  focus-visible:border-[1px] focus-visible:border-black max-sm:text-xs text-sm truncate ${width}`}>
        <SelectValue placeholder={label}/>
      </SelectTrigger>
      <SelectContent>
        
          {state.map((item:any, index:number) => {
            return (
              <div key={index}>
                <SelectItem  
                value={item.category ? item.category : item.warehouseName ? item.warehouseName : item.name? item.name : item} 
                >
                  <div className="flex items-center gap-2">
                    <PiGlobeHemisphereWestDuotone className={`${item == "All Warehouse" ? "flex" : "hidden"}`}/>
                    <PiWarehouseDuotone className={`${item !== "All Warehouse"  && label == "Warehouse" ? "flex" : "hidden"}`}/>
                    <p>{item.category ? item.category : item.warehouseName ? item.warehouseName : item.name? item.name : item}</p>
                  </div>
                </SelectItem>
                <Separator className={item == 'Select All' || item == 'All'  ? '' : 'hidden'}/>
              </div>
            )
          })}
      </SelectContent>
    </Select>
  )
}
