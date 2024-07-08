'use client'
import { ToolTip } from "@/components/Tooltip"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { calculateAge } from "@/lib/utils"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import { IAdmin } from "../../_components/ExpTable"
import { PiUserCircle, PiWarehouse, PiWarehouseBold, PiXCircle } from "react-icons/pi"
import { getRequest } from "@/lib/fetchRequests"
import { Warehouse } from "@/constants"
import ActiveIndicator from "@/components/sidebar/ActiveIndicator"

const AssignCell = ({ row }: { row: any }) => {
  const [availableWarehouses, setAvailableWarehouses] = useState<Warehouse[]>([])

  useEffect(() => {
    const getAvailableWarehouses = async () => {
      try {
        const res = await getRequest('/warehouses/available-warehouses');
        const data = await res.json();
        setAvailableWarehouses(data.data);
      } catch (error) {
        console.log(error);
      }
    }

    getAvailableWarehouses();
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {availableWarehouses.length > 0 ? (
          availableWarehouses.map((warehouse: Warehouse) => (
            <DropdownMenuItem className="cursor-pointer" key={warehouse.id}>
              <div className="flex justify-between w-full">
                <div className="flex items-center gap-2">
                  <PiWarehouse size={`1.2rem`} />
                  <span>{warehouse.warehouseName}</span>
                </div>
                <span className="font-semibold">({warehouse.province})</span>
              </div>
            </DropdownMenuItem>
          ))
        ) : (
          <DropdownMenuItem>Warehouse not available</DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const ActionCell = ({ row }: { row: any }) => {
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
          <Link className="flex gap-1 items-center" href={`/admins/admins/${row.getValue('id')}`}>
            <PiUserCircle size={`1.2rem`} />
            View admin details
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const Columns: ColumnDef<IAdmin>[] = [
  {
    accessorKey: 'id',
    header: "No",
    cell: ({ row }) => (
      <div className="capitalize">{row.index + 1}</div>
    ),
  },
  {
    accessorKey: "fullName",
    header: ({ column }) => {
      return (
        <Button variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Full Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("fullName")}</div>
    ),
  },
  {
    accessorKey: "email",
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "accountActive",
    header: () => <div className="capitalize text-center">Status</div>,
    cell: ({ row }) => (
      <div className="flex justify-center">
        <ActiveIndicator isActive={row.getValue('accountActive')} activeText={"Admin is verified"} nonActiveText={"Admin is NOT verified"} />
      </div>
    ),
  },
  {
    accessorKey: "gender",
    header: "Gender",
    cell: ({ row }) => (
      <div className="capitalize">{`${row.getValue('gender') ? row.getValue('gender') : '-'}`}</div>
    ),
  },
  {
    accessorKey: "dob",
    header: "Age",
    cell: ({ row }) => (
      <div className="capitalize">{typeof calculateAge(row.getValue("dob")) === 'number' ? calculateAge(row.getValue("dob")) : '-'}</div>
    ),
    meta: {
      filterVariant: 'range',
    },
  },
  {
    id: "assign",
    enableHiding: false,
    header: () => {
      return <span>Assign</span>
    },
    cell: AssignCell,
  },
  {
    id: "actions",
    enableHiding: false,
    header: () => {
      return <span>Action</span>
    },
    cell: ActionCell,
  },
]

export default Columns;
