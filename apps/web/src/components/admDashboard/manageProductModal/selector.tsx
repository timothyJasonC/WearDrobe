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

export function Selector({label, state, defValue, setState}:{label:string, state:any, defValue:string, setState:any}) {   
  return (
    <Select value={defValue} onValueChange={(value) => state.length > 0 ? setState(value) : console.log(value)} disabled={state.length == 0 ? true : false}>
      <SelectTrigger className="focus:ring-transparent  focus-visible:border-[1px] focus-visible:border-black text-sm">
        <SelectValue placeholder={label}/>
      </SelectTrigger>
      <SelectContent>
          {state.map((item:any, index:number) => {
            return (
            <SelectItem key={index} 
            value={item.category ? item.category : item.warehouseName ? item.warehouseName : item} 
            >
              <div className="flex items-center gap-2">
                <PiGlobeHemisphereWestDuotone className={`${item == "All Warehouse" ? "flex" : "hidden"}`}/>
                <PiWarehouseDuotone className={`${item !== "All Warehouse"  && label == "Warehouse" ? "flex" : "hidden"}`}/>
                <p>{item.category ? item.category : item.warehouseName ? item.warehouseName : item}</p>
              </div>
            </SelectItem>
            )
          })}
      </SelectContent>
    </Select>
  )
}
