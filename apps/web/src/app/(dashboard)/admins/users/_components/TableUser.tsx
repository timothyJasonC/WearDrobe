import { IUser } from "@/app/(home)/(user-dashboard)/user/edit-profile/_components/EditProfileForm"
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
import { ToolTip } from '@/components/Tooltip';
import { PiCheck } from "react-icons/pi";
  
const invoices = [
{
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
},
{
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
},
{
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
},
{
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
},
{
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
},
{
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
},
{
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
},
]
  
export function TableUser({ heads, data }: { heads: string[], data: any }) {
    
    return (
        <>
            <Table>
                {/* <TableCaption>A list of your recent invoices.</TableCaption> */}

                <TableHeader>
                    <TableRow>
                        { heads.map((head, idx) => {
                            return <TableHead className={`
                                
                                ${ head=='Email' ? 'w-64' : '' } 
                                ${ head=='Username' ? 'w-40' : '' } 
                                border-2 border-red-400 text-center`} 
                                
                                key={idx}>
                                    { head == 'No' ? 'No' : head }
                            </TableHead>
                        }) }
                        {/* <TableHead className="w-[100px]">Invoice</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead className="text-right">Amount</TableHead> */}
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {data.map((user: IUser, idx: number) => (
                    <TableRow key={idx}>
                        <TableCell className="font-medium w-5">{idx}</TableCell>
                        <TableCell className="font-medium">{user.username}</TableCell>
                        <TableCell className="font-medium">{user.email}</TableCell>
                            <TableCell className="font-medium w-8">
                                {
                                    user.accountActive ?
                                    <ToolTip className='flex justify-center' content={`${user.username} is verified`} >
                                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                                    </ToolTip>
                                    :
                                    <ToolTip className='flex justify-center' content={`${user.username} is not verified`} >
                                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                    </ToolTip>
                                    
                                }
                            </TableCell>
                        <TableCell className="font-medium">{user.gender ? user.gender : '-'}</TableCell>
                        {/* <TableCell className="font-medium">{user.dob}</TableCell> */}
                        {/* <TableCell>{invoice.paymentStatus}</TableCell>
                        <TableCell>{invoice.paymentMethod}</TableCell>
                        <TableCell className="text-right">{invoice.totalAmount}</TableCell> */}
                    </TableRow>
                    ))}
                </TableBody>

                {/* <TableFooter>
                    <TableRow>
                    <TableCell colSpan={3}>Total</TableCell>
                    <TableCell className="text-right">$2,500.00</TableCell>
                    </TableRow>
                </TableFooter> */}
            </Table>
            
        </>
    )
}
  