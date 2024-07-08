'use client'
import { IUser } from "@/app/(home)/(user-dashboard)/user/edit-profile/_components/EditProfileForm"
import { ToolTip } from "@/components/Tooltip"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { calculateAge } from "@/lib/utils"
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

export const columns: ColumnDef<IUser>[] = [
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
    accessorKey: "username",
    header: ({ column }) => {
      return (
        <Button variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Username
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("username")}</div>
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
      <div className="capitalize flex justify-center">
        {row.getValue('accountActive') ? 
          <ToolTip content="user is verified">
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
          </ToolTip>
          :
          <ToolTip content="user is NOT verified">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
          </ToolTip>
        }
      </div>
    ),
  },
  {
    accessorKey: "gender",
    header: "Gender",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue('gender') ? row.getValue('gender') : '-'}</div>
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
    id: "actions",
    enableHiding: false,
    header: "Action",
    cell: ActionsCell,
  },
]

export default columns;
