'use client'

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { IWarehouse } from "@/constants";
import { useEffect, useState } from "react";
import { PiCaretCircleDownFill } from "react-icons/pi";
import { PiWarehouseDuotone } from "react-icons/pi";
import { PiGlobeHemisphereWestDuotone } from "react-icons/pi";

interface IDropdown {
  selectedWH: string,
  setSelectedWH: React.Dispatch<React.SetStateAction<string>>
  warehouseList: IWarehouse[]
  isSuper: boolean
}

export function WarehouseDropdown({ selectedWH, setSelectedWH, warehouseList, isSuper }: IDropdown) {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="text-4xl hover:bg-gray-100 rounded-none px-0 border-b-2 border-b-black">
          <PiCaretCircleDownFill className="text-xl mr-2" /> {selectedWH}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" onCloseAutoFocus={(e) => e.preventDefault()}>
        <DropdownMenuLabel>Choose Warehouse</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuGroup className={isSuper ? '' : 'hidden'}>
          <DropdownMenuItem onClick={() => setSelectedWH("All Warehouses")}>
            <PiGlobeHemisphereWestDuotone className="mr-2 h-4 w-4" />
            <span>All warehouses</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className={isSuper ? '' : 'hidden'} />

        <DropdownMenuGroup>
          {warehouseList.map((item: IWarehouse) => {
            return (
              <DropdownMenuItem key={item.id} onClick={() => setSelectedWH(item.warehouseName!)}>
                <PiWarehouseDuotone className="mr-2 h-4 w-4" />
                <span>{item.warehouseName}</span>
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuGroup>

      </DropdownMenuContent>
    </DropdownMenu>
  )
}
