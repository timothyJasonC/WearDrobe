'use client'
import { ToolTip } from "@/components/Tooltip"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { calculateAge } from "@/lib/utils"
import { ColumnDef, Row } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import { PiPlusBold, PiUserCircle, PiWarehouse, PiWarehouseBold, PiXCircle } from "react-icons/pi"
import { getRequest } from "@/lib/fetchRequests"
import { Warehouse } from "@/constants"
import ActiveIndicator from "@/components/sidebar/ActiveIndicator"
import { Role } from "../../_components/ExpTable"
import { Gender } from "@/app/(home)/(user-dashboard)/user/edit-profile/_components/EditProfileForm"
import { toast } from "sonner"
import { Spinner } from "@/components/ui/spinner"
import { Checkbox } from "@/components/ui/checkbox"

export interface IAdmin {
    id: string;
    role: Role;
    accountActive: boolean | null;
    fullName?: string;
    email: string;
    password?: string;
    gender?: Gender;
    dob?: Date;
    createdAt: Date;
}

const AssignCell = ({ row }: { row: Row<IAdmin> }) => {
    const [availableWarehouses, setAvailableWarehouses] = useState<Warehouse[]>([])
    const [ currentWarehouses, setCurrentWarehouses ] = useState<Warehouse[]>([])
    const [ isLoadingWarehouse, setIsLoadingWarehouse ] = useState<boolean>(true)
    const adminId = row.original.id;
    const adminName = row.original.fullName;
    useEffect(() => {
        async function getCurrentWarehouses() {
            try {
                const res = await getRequest('/warehouses/all');
                const data = await res.json();
                setCurrentWarehouses(data.data);
            } catch (error) {
                toast.error(error instanceof Error ? error.message : "Something went wrong on admin table", { description: "assign cell component had trouble fetching all warehouses" })
            }
        }
        const getAvailableWarehouses = async () => {
            try {
                const res = await getRequest('/warehouses/available-warehouses');
                const data = await res.json();
                setAvailableWarehouses(data.data);
                setIsLoadingWarehouse(false)
            } catch (error) {
                toast.error(error instanceof Error ? error.message : "Something went wrong on admin table", { description: "assign cell component had trouble fetching available warehouses" })
            }
        }
        getCurrentWarehouses();
        getAvailableWarehouses();
    }, []);

    async function handleAssignAdmin() {

    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {
                    !isLoadingWarehouse ?
                        availableWarehouses.length > 0 ?
                            <>
                                <span className="p-2">Assign <span className="font-semibold">{adminName}</span> to:</span>
                                <DropdownMenuSeparator/>
                                { availableWarehouses.map((warehouse: Warehouse) => (
                                    <DropdownMenuItem className="cursor-pointer" key={warehouse.id}>
                                        <div className="flex gap-4 justify-between w-full">
                                            <div className="flex items-center gap-2">
                                                <PiWarehouse size={`1.2rem`} />
                                                <span>{warehouse.warehouseName}</span>
                                            </div>
                                            <span className="font-semibold">({warehouse.province})</span>
                                        </div>
                                    </DropdownMenuItem>
                                )) }
                            </>
                        :
                        <DropdownMenuItem>{ currentWarehouses.length > 0 ? 'All warehouse is fully assigned' : 
                            <Link className="flex items-center gap-1" href={'/admins/warehouses'}><PiPlusBold/> Create New Warehouse</Link> 
                        }</DropdownMenuItem>
                    :
                    <DropdownMenuItem className="flex items-center gap-2">
                        <Spinner size={'small'} />Fetching available warehouse, please wait
                    </DropdownMenuItem>
                }
                {/* { availableWarehouses.length > 0 ? (
                availableWarehouses.map((warehouse: Warehouse) => (
                    <DropdownMenuItem className="cursor-pointer" key={warehouse.id}>
                        <div className="flex gap-4 w-full">
                            <div className="flex items-center gap-2">
                                <PiWarehouse size={`1.2rem`} />
                                <span>{warehouse.warehouseName}</span>
                            </div>
                            <span className="font-semibold">({warehouse.province})</span>
                        </div>
                    </DropdownMenuItem>
                ))
                ) : (
                <DropdownMenuItem>{ currentWarehouses.length > 0 ? 'All warehouse is fully assigned' : 
                        <Link className="flex items-center gap-1" href={'/admins/warehouses'}><PiPlusBold/> Create New Warehouse</Link> 
                }</DropdownMenuItem>
                    
                )} */}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

const ActionCell = ({ row }: { row: Row<IAdmin> }) => {
    const adminId = row.original.id
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
                    <Link className="flex gap-1 items-center" href={`/admins/admins/${adminId}`}>
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
        id: "select",
        header: ({ table }) => (
            <Checkbox
            checked={
                table.getIsAllPageRowsSelected() ||
                (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
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
