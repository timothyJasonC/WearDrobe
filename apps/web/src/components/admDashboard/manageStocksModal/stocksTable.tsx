import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { IProduct, IWarehouse } from "@/constants"
  interface IDropdown {
    selectedWH:string,
    setSelectedWH:React.Dispatch<React.SetStateAction<string>>
    warehouseList: IWarehouse[]
    productList: IProduct[]
  }
  

  
  export function StockTable({selectedWH, setSelectedWH, warehouseList, productList}:IDropdown) {
    return (
      <Table className="my-7">
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">No.</TableHead>
            <TableHead className="">Product Name</TableHead>
            <TableHead className="text-center">Size</TableHead>
            <TableHead className="text-center max-w-52">Variant</TableHead>
            <TableHead className="text-center">Category</TableHead>
            <TableHead className="text-center min-w-32">Last Updated</TableHead>
            <TableHead className="text-center">Total Stock</TableHead>
            <TableHead className="text-center"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {productList && productList.length > 0 
          ? 
          productList.map((item, index) => {
            
            const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
            const dateTime = new Date(item.stockUpdatedAt)
            const date = dateTime.getDate()
            const month = months[dateTime.getMonth()]
            const year = dateTime.getFullYear()
            const hours = dateTime.getHours()
            const minute = dateTime.getMinutes()
            return (    
            <TableRow key={item.id}>
              <TableCell>{index+1}</TableCell>
              <TableCell className="font-semibold">{item.name}</TableCell>
              <TableCell className="text-center">{item.oneSize ? "One Size" : "S M L XL"}</TableCell>
              <TableCell className="text-center text-xs flex flex-wrap gap-1 justify-center">{
                item.variants.map(item => {
                  const brightColor = ["D", 'E', 'F']
                  const textColor = brightColor.includes(item.HEX.slice(1,2).toUpperCase())
                  const borderColor = (item.HEX.slice(3, 4).toUpperCase() === 'F')
                  return (
                    <div 
                      key={item.id} style={{ background: `${item.HEX}` }} 
                      className={`flex px-2 ${borderColor? "border-[1px] border-black rounded-full": 'rounded-full'}`} >
                      <p className={textColor ? "text-black" : 'text-white'}>{item.color}</p>
                    </div>
                  )
                })
                }</TableCell>
              <TableCell className="text-center">{item.category.gender.at(0) + item.category.gender.slice(1).toLowerCase()} | {item.category.type.at(0) + item.category.type.slice(1).toLowerCase()} | {item.category.category}</TableCell>
              <TableCell className={`text-center ${item.stockUpdatedAt? "hidden" : "block"}`}>no data</TableCell>
              <TableCell className={`flex-wrap items-center justify-center gap-x-1 ${item.stockUpdatedAt? "flex" : "hidden"}`}><p>{date} {month} {year},</p><p>{hours.toString().padStart(2, '0')}.{minute.toString().padStart(2, '0')} WIB</p></TableCell>
              <TableCell className="text-center">{item.totalStock}</TableCell>
              <TableCell className="text-center"></TableCell>
            </TableRow>
            )
          })
          :
          <TableRow>
            <TableCell className="font-medium text-center" colSpan={8} >Data will appear here.</TableCell>
          </TableRow>
        } 
        </TableBody>
      </Table>
    )
  }
  