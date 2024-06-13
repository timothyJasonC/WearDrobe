'use client'

import {
    Cloud,
    CreditCard,
    Github,
    Keyboard,
    LifeBuoy,
    LogOut,
    Mail,
    MessageSquare,
    Plus,
    PlusCircle,
    Settings,
    User,
    UserPlus,
    Users,
  } from "lucide-react"
  
  import { Button } from "@/components/ui/button"
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import { PiCaretCircleDownFill } from "react-icons/pi";
  import { PiWarehouseDuotone } from "react-icons/pi";
  import { PiGlobeHemisphereWestDuotone } from "react-icons/pi";
  
  export function WarehouseDropdown() {
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
  