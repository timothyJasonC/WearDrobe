import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { PiFunnel, PiFunnelFill, PiXCircleFill } from "react-icons/pi";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useEffect, useState } from "react";
import { ICategory } from "@/constants";
import { getCategory } from "@/app/action";
import { Selector } from "@/components/selector";

interface ISalesPopover {
  gender: string
  type: string
  category: string
  setGender: React.Dispatch<React.SetStateAction<string>> 
  setType: React.Dispatch<React.SetStateAction<string>>
  setCategory: React.Dispatch<React.SetStateAction<string>>
}

export function SalesPopover({gender, type, category, setGender, setType, setCategory}:ISalesPopover) {
  const [categoryList, setCategoryList] = useState<ICategory[]>([])

  useEffect(() => {
    const getCategoryData = async() => {
      if (gender && gender !== 'All' && type && type !== 'All') {
        const data = await getCategory(gender, type)
        setCategoryList(data.category)
      }
    }
    getCategoryData()
  }, [gender, type])

  useEffect(() => {
    if (gender !== "All" ) {
        setCategory('All')
      }  
    if (gender == "All") {
      setType('All')
      setCategory('All')
    }   
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gender, type])


  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="gap-1"><p className="max-sm:hidden">Category</p> 
        { gender !== 'All' || type !== 'All' || category !== 'All'
        ?
        <div className="relative" onClick={() => {setGender('All')}}>
          <PiFunnelFill className="text-lg "/>
          <PiXCircleFill className="absolute text-red-500 text-sm -bottom-0 -right-1"/>
        </div>
        :<PiFunnel className="text-lg"/>
        }
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Filter Category</h4>
            <p className="text-sm text-muted-foreground">
              Set category to display.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="width">Gender</Label>
              <Selector
                      defValue={gender}
                      label='Gender'
                      state={["All", "Men", "Women", "Unisex"]}
                      setState={setGender}
                      width="col-span-2"
                    />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxWidth">Type</Label>
              <Selector 
                      defValue={type}
                      label='Type'
                      state={gender && gender !== 'All' ? ["All", "Tops", "Bottoms", "Accessories"] : []}
                      setState={setType}
                      width="col-span-2"
                    />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="height">Category</Label>
              <Selector 
                defValue={category}
                label="Category"
                state={(categoryList.length > 0 && gender !== 'All' && type !=='All' ? ['All', ...categoryList] : [])}
                setState={setCategory}
                width="col-span-2"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <div></div>
              <Button disabled={gender == 'All' ? true : false } className="col-span-2" onClick={() => {setGender('All')}}>
                Clear
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
