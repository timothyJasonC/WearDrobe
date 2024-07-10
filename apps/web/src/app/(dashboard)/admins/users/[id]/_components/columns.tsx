'use client'
import { IUser } from "@/app/(home)/(user-dashboard)/user/edit-profile/_components/EditProfileForm"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { IOrder, IWarehouse } from "@/constants"
import { getRequest } from "@/lib/fetchRequests"
import { formatToIDR } from "@/lib/utils"
import { ColumnDef, Row } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import { PiArrowUpRightBold } from "react-icons/pi"
import { toast } from "sonner"

function WarehouseInfo({ row }: { row: Row<IOrder> }) {

    const [ warehouse, setWarehouse ] = useState<IWarehouse | null>();
    const warehouseId = row.original.warehouseId;

    async function getWarehouse() {
        try {
            const res = await getRequest(`warehouses/get-warehouse-by-id/${ warehouseId }`)
            const data = await res.json()
            setWarehouse(data.data)
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Error fetching warehouse on user table")
        }
    }

    useEffect(() => {
        getWarehouse()
    }, [])

    return(
        <div className="lowercase">{ warehouse?.warehouseName }</div>
    )
}
export const columns: ColumnDef<IOrder>[] = [
  {
    accessorKey: 'no',
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
    header: "Status"
  },
  {
    accessorKey: "warehouseId",
    header: "Warehouse",
    cell: WarehouseInfo
  },
  {
    accessorKey: "totalAmount",
    header: "Total Amount",
    cell: ({ row }) => <div className="lowercase">{formatToIDR(row.getValue("totalAmount"))}</div>,
  },
  {
    accessorKey: "shippingMethod",
    header: "Shipping Method",
    cell: ({ row }) => <div className="lowercase">{row.getValue("shippingMethod")}</div>,
  },
  {
    accessorKey: "shippedAt",
    header: "Shipped At",
    cell: ({ row }) => <div className="lowercase">{row.getValue("shippedAt")}</div>,
  },
  {
    accessorKey: "createdAt",
    header: "Ordered At",
    cell: ({ row }) => <div className="lowercase">{row.getValue("createdAt")}</div>,
  }
]

export default columns;
