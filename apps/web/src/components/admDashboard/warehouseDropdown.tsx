'use client'
  
  import { Button } from "@/components/ui/button"
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { IWarehouse } from "@/constants";
import { useState } from "react";
  import { PiCaretCircleDownFill } from "react-icons/pi";
  import { PiWarehouseDuotone } from "react-icons/pi";
  import { PiGlobeHemisphereWestDuotone } from "react-icons/pi";
  
  export function WarehouseDropdown() {
    const [warehouseList, setWarehouseList] = useState<IWarehouse[]>([])

    const getWarehouse = async() => {
      const warehouse = await getWarehouse()

    }
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="text-4xl hover:bg-gray-100 rounded-none px-0 border-b-2 border-b-black"><PiCaretCircleDownFill className="text-xl mr-2"/> Bandung</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" onCloseAutoFocus={(e) => e.preventDefault()}>
          <DropdownMenuLabel>Choose Warehouse</DropdownMenuLabel>
          <DropdownMenuSeparator />
         
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <PiGlobeHemisphereWestDuotone className="mr-2 h-4 w-4" />
              <span>All warehouse</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />
          
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <PiWarehouseDuotone className="mr-2 h-4 w-4" />
              <span>Jakarta</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <PiWarehouseDuotone className="mr-2 h-4 w-4" />
              <span>Bandung</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <PiWarehouseDuotone className="mr-2 h-4 w-4" />
              <span>Semarang</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <PiWarehouseDuotone className="mr-2 h-4 w-4" />
              <span>Surabaya</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <PiWarehouseDuotone className="mr-2 h-4 w-4" />
              <span>Medan</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <PiWarehouseDuotone className="mr-2 h-4 w-4" />
              <span>Palembang</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>

        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
  