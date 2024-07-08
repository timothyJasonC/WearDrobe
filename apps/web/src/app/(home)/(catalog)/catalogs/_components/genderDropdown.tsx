'use client'
  
  import { Button } from "@/components/ui/button"
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import { PiCaretCircleDownFill } from "react-icons/pi";

  interface IDropdown {
    gender:string,
    setGender:React.Dispatch<React.SetStateAction<string>>
    genderList: string[]
  }
  
  export function GenderDropdown({gender, setGender, genderList}:IDropdown) {

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex w-32 justify-between gap-2 item-center text-2xl hover:bg-gray-100 rounded-none px-0 border-b-2 border-b-black">
            {gender}
            <PiCaretCircleDownFill className="text-xl mr-2"/> 
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-32" align="start" onCloseAutoFocus={(e) => e.preventDefault()}>          
          <DropdownMenuGroup>
            {genderList.map((item:string, index) => {
              return (
                <div key={index}>
                    <DropdownMenuItem  onClick={() => setGender(item)}>
                    <span className={item === 'Select' ? 'hidden' : ''}>{item}</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className={index == 3 || item === 'Select' ? 'hidden' : ''} />
                </div>
              )
            })}
          </DropdownMenuGroup>

        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
  