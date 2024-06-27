import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { IProduct } from "@/constants";
import { EditProductDialog } from "./editProductDialog";
import { SubmitAlert } from "../../../../components/submitAlertTemplate";
import { PiTrashFill } from "react-icons/pi";
import { deleteProduct } from "@/app/action";
import { toast } from "sonner";

interface IProdTable {
  productList: IProduct[]
  action:()=>void
  isSuper: boolean
}
  
  export function ProdTable({productList, action, isSuper}:IProdTable) {
    const handleDelete = async(slug:string) => {
      try {
        const data = await deleteProduct(slug)
        if (data.status === "ok") {
          action()
          toast.success("Product deleted.")
        } else if (data.status === "error") {
          toast.error("Failed to delete product.")
        }
      } catch (error) {
        console.log(error);
      }
    }
    
    
    return (
      <Table className="my-7">
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">No.</TableHead>
            <TableHead>Product Name</TableHead>
            <TableHead className="text-center">Gender</TableHead>
            <TableHead className="text-center">Type</TableHead>
            <TableHead className="text-center">Category</TableHead>
            <TableHead className="text-center min-w-32">Date created</TableHead>
            <TableHead className="text-center">Variants</TableHead>
            <TableHead className="text-center">Stock</TableHead>
            <TableHead className="text-center">Sales (IDR)</TableHead>
            <TableHead className="text-center">Price (IDR)</TableHead>
            <TableHead className={`${isSuper ? '' : 'hidden'}text-center`}></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {productList.length ? 
            productList.map((product, index) => {
            const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
            const dateTime = new Date(product.createdAt)
            const date = dateTime.getDate()
            const month = months[dateTime.getMonth()]
            const year = dateTime.getFullYear()
            const hours = dateTime.getHours()
            const minute = dateTime.getMinutes()
            return(
            <TableRow key={index}>
              <TableCell>{index+1}</TableCell>
              <TableCell className="text-pretty font-semibold">{product.name}</TableCell>
              <TableCell className="text-center">{product.category.gender.toLocaleLowerCase()}</TableCell>
              <TableCell className="text-center">{product.category.type.toLocaleLowerCase()}</TableCell>
              <TableCell className="text-center">{product.category.category}</TableCell>
              <TableCell className="flex flex-wrap items-center justify-center gap-x-1"><p>{date} {month} {year},</p><p>{hours.toString().padStart(2, '0')}.{minute.toString().padStart(2, '0')} WIB</p></TableCell>
              <TableCell className="text-center">{product.variants.length}</TableCell>
              <TableCell className="text-center">{product.totalStock}</TableCell>
              <TableCell className="text-center">{product.sales ? product.sales : 'no data'}</TableCell>
              <TableCell className="text-center">{new Intl.NumberFormat('en-DE').format(product.price)}</TableCell>
              <TableCell className={`${isSuper ? '' : 'hidden'}text-center`}>
                <div className="flex gap-2">
                  <EditProductDialog 
                    slug={product.slug}
                    action={action}
                    isSuper={isSuper}
                    />
                  <SubmitAlert 
                    action={() => handleDelete(product.slug)} 
                    hidden={isSuper ? false : true}
                    icon={<PiTrashFill className='flex hover:cursor-pointer text-xl text-red-400 hover:text-red-500'/>} 
                    title={"Delete product?"} 
                    message={"Product and its stocks will be permanently deleted. Action cannot be undone."}/>
                </div>
              </TableCell>
            </TableRow>
          )})
        : 
        <TableRow>
            <TableCell className="font-medium text-center" colSpan={11} >Data will appear here.</TableCell>
        </TableRow>
        }
        </TableBody>
      </Table>
    )
  }
  