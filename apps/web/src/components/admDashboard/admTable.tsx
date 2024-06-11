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
import { PiNotePencil } from "react-icons/pi";

const date = new Date()
  
const invoices = [
    {
      name: "T-Shirt Dry Warna Kerah Bulat",
      stock: "739",
      createdAt: '23 June 2023, 10.00 WIB',
      gender: "Men",
      type: "Top",
      category: "T-shirt",
      price: "300.000"
    }
  ]
  
  export function AdmTable() {
    return (
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">No.</TableHead>
            <TableHead>Product Name</TableHead>
            <TableHead className="text-center">Stock</TableHead>
            <TableHead className="text-center">Date created</TableHead>
            <TableHead className="text-center">Sex</TableHead>
            <TableHead className="text-center">Type</TableHead>
            <TableHead className="text-center">Category</TableHead>
            <TableHead className="text-center">Price (IDR)</TableHead>
            <TableHead className="text-center"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((product, index) => (
            <TableRow key={index}>
              <TableCell>{index+1}</TableCell>
              <TableCell className="text-pretty font-semibold">{product.name}</TableCell>
              <TableCell className="text-center">{product.stock}</TableCell>
              <TableCell className="text-center">{product.createdAt}</TableCell>
              <TableCell className="text-center">{product.gender}</TableCell>
              <TableCell className="text-center">{product.type}</TableCell>
              <TableCell className="text-center">{product.category}</TableCell>
              <TableCell className="text-center">{product.price}</TableCell>
              <TableCell>
                <div className="flex w-14 justify-center items-center gap-1 border-b-2 border-b-transparent hover:border-b-black hover:cursor-pointer">
                    <p className="font-semibold">Edit</p>
                    <PiNotePencil className="text-xl"/>
                </div>
            </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }
  