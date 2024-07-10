'use client'
import { IUser } from "@/app/(home)/(user-dashboard)/user/edit-profile/_components/EditProfileForm"
import { ToolTip } from "@/components/Tooltip"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { IOrder } from "@/constants"
import { calculateAge, formatToIDR } from "@/lib/utils"
import { ColumnDef, Row } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import Link from "next/link"
import React from "react"
import { PiArrowUpRightBold } from "react-icons/pi"

const ActionsCell = ({ row }: { row: Row<IUser> }) => {
    const userId = row.original.id;
    return (
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
            <DropdownMenuItem>
            <Link className="flex items-center gap-2" href={`/admins/users/${userId}`}>
                View user details
                <PiArrowUpRightBold />
            </Link>
            </DropdownMenuItem>
        </DropdownMenuContent>
        </DropdownMenu>
    );
};
// id, status, warehouseId, totalAmount, shippingMethod, shippedAt, createdAt
export const columns: ColumnDef<IOrder>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => {
        return (
          <Button variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            No
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.index + 1}</div>
    ),
  },
  {
    accessorKey: "id",
    header: "Order ID",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("id")}</div>
    ),
  },
  {
    accessorKey: "status",
    cell: ({ row }) => <div className="lowercase">{row.getValue("status")}</div>,
  },
  {
    accessorKey: "warehouseId",
    cell: ({ row }) => <div className="lowercase">{row.getValue("warehouseId")}</div>,
  },
  {
    accessorKey: "totalAmount",
    cell: ({ row }) => <div className="lowercase">{formatToIDR(row.getValue("totalAmount"))}</div>,
  },
  {
    accessorKey: "shippingMethod",
    cell: ({ row }) => <div className="lowercase">{row.getValue("shippingMethod")}</div>,
  },
  {
    accessorKey: "shippedAt",
    cell: ({ row }) => <div className="lowercase">{row.getValue("shippedAt")}</div>,
  },
  {
    accessorKey: "createdAt",
    cell: ({ row }) => <div className="lowercase">{row.getValue("createdAt")}</div>,
  }
]

export default columns;
