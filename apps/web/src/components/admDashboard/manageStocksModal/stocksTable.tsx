import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"


  
  export function StockTable() {
    return (
      <Table className="my-7">
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">No.</TableHead>
            <TableHead className="">Product Name</TableHead>
            <TableHead className="text-center">Size</TableHead>
            <TableHead className="text-center">Variant</TableHead>
            <TableHead className="text-center">Category</TableHead>
            <TableHead className="text-center min-w-32">Last Updated</TableHead>
            <TableHead className="text-center">Total Stock</TableHead>
            <TableHead className="text-center"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
        <TableRow>
            <TableCell>1</TableCell>
            <TableCell className="font-semibold">Casual Tee</TableCell>
            <TableCell className="text-center">Xl</TableCell>
            <TableCell className="text-center">3</TableCell>
            <TableCell className="text-center">Men Tops T-shirts</TableCell>
            <TableCell className="text-center">23 Jun 2023, 10.00 WIB</TableCell>
            <TableCell className="text-center">312</TableCell>
            <TableCell className="text-center"></TableCell>
        </TableRow>
        </TableBody>
      </Table>
    )
  }
  