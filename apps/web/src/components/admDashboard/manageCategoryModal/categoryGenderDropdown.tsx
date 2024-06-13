'use client'
  import { Button } from "@/components/ui/button"
  import { IconType } from 'react-icons';
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import { PiCaretCircleDownFill } from "react-icons/pi";

  
  export const ManageCategoryDropdown = ({state, setState, options, icon:Icon}:{state:any, setState:(value: string) => void, options:string[], icon: IconType}) => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="text-4xl text-black hover:bg-gray-100 rounded-none border-b-2  border-b-black justify-between w-32 px-0">
            <div className="flex items-center gap-2">
              <Icon className="text-base"/>
              <p className="text-base">{state}</p>
            </div> 
            <PiCaretCircleDownFill className="text-base"/></Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-32" onCloseAutoFocus={(e) => e.preventDefault()}>
          
          <DropdownMenuGroup>
            {options.map((item:any, index:number) => {
              return (
              <DropdownMenuItem key={index} onClick={() => setState(item)}>
                <span>{item}</span>
              </DropdownMenuItem>
              )
            })}
          </DropdownMenuGroup>

        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
  