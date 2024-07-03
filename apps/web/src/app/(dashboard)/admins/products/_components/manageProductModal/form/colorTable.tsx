/* eslint-disable @next/next/no-img-element */
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  
  interface IColor {
        code: string, 
        image: File, 
        name: string,
    }
import { PiTrashFill } from "react-icons/pi";
  export function ColorTable({color, setColor}:{color:IColor[], setColor:any}) {

    const handleDelete = (idx:number) => {
        setColor(color.filter((item, index) => index !== idx))
    }
    return (
      <div className="mt-2 border-[1px] rounded overflow-hidden">
        <Table className="">
          <TableHeader>
            <TableRow className="bg-secondary">
              <TableHead className="max-sm:hidden"></TableHead>
              <TableHead className="text-center">Color</TableHead>
              <TableHead className="text-center">HEX</TableHead>
              <TableHead className="text-center">Image</TableHead>
              <TableHead className="text-center"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {color.length ? 
              color.map((item:IColor, index:number) => (
                  <TableRow key={index} className="">
                  <TableCell className="max-sm:hidden">{index+1}</TableCell>
                  <TableCell className="font-medium text-center">{item.name}</TableCell>
                  <TableCell>
                      <div className="flex max-sm:flex-col items-center justify-center gap-2">
                          <div style={{ backgroundColor: item.code }} className="w-4 h-4" />
                          {item.code}
                      </div>
                  </TableCell>
                  <TableCell className="flex items-center justify-center">
                      <div className="w-10">
                          <img alt={item.name} src={URL.createObjectURL(item.image)} className="w-10 h-10 object-cover object-center"></img>
                      </div>
                  </TableCell>
                  <TableCell>
                      <PiTrashFill className='flex text-red-400 hover:text-red-500 hover:cursor-pointer' onClick={() => handleDelete(index)}/>
                  </TableCell>
                  </TableRow>
              ))
              : 
              <TableRow>
                  <TableCell className="font-medium text-xs" colSpan={5} >Data will appear here.</TableCell>
              </TableRow>
              }
          </TableBody>
        </Table>
      </div>
    )
  }
  