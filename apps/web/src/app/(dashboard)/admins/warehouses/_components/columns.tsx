'use client'
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ColumnDef, Row } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import { PiDotsThreeVerticalBold, PiLightningFill, PiPencilBold, PiXCircleBold } from "react-icons/pi"
import { deleteRequest, getRequest, patchRequest } from "@/lib/fetchRequests"
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { LoadingButton } from "@/components/ui/loading-button"
import { DialogWarehouse } from "./DialogWarehouse"
import { ToolTip } from "@/components/Tooltip"
import { Gender } from "@/app/(home)/(user-dashboard)/user/edit-profile/_components/EditProfileForm"
import { Role } from "../../_components/ExpTable"
import { toast } from "sonner"
import { Checkbox } from "@/components/ui/checkbox"
import ActiveIndicator from "@/components/sidebar/ActiveIndicator"
import { useRouter } from "next/navigation"

interface IAdmin {
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

export interface IWarehouse {
    id: string;
    warehouseName: string;
    city: string;
    coordinate: string;
    address: string;
    city_id: string;
    province_id: string;
    province: string;
    type: string;
    city_name: string;
    postal_code: string;
    createdAt: string;
    adminID: string | null;
    isActive: boolean;
}

const AssignedAdminCell = ({ adminID }: { adminID: string | null }) => {
    const [currentAdmin, setCurrentAdmin] = useState<IAdmin | null>(null);

    useEffect(() => {
        if (adminID) {
            async function getAssignedAdmin() {
                const res = await (await getRequest(`admin/${adminID}`)).json();
                const admin = res.data;
                setCurrentAdmin(admin);
            }
            getAssignedAdmin();
        }
    }, []);

    return (
        <>
            <ToolTip content={currentAdmin && currentAdmin?.fullName ? `Click to see ${currentAdmin && currentAdmin?.fullName}` : 'No admin is assigned, yet'}>
                {
                    currentAdmin && currentAdmin?.id ?
                    <Link href={`/admins/admins/${currentAdmin && currentAdmin?.id}`}>{ currentAdmin?.fullName && currentAdmin?.fullName }</Link>
                    :
                    <div className="lowercase">{currentAdmin && currentAdmin?.fullName ? currentAdmin?.fullName : '-'}</div>
                }
            </ToolTip>
        </>
    );
};

const ActionsCell = ({ row }: { row: Row<IWarehouse> }) => {
    const [openDropdown, setOpenDropdown] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [editDialog, setEditDialog] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const isActive = row.original.isActive;
    const warehouse = row.original;
    const warehouseId = row.original.id;
    const warehouseName = row.original.warehouseName
    const router = useRouter();

    async function handleDeactivate() {
        setIsLoading(true)
        try {
            const res = await deleteRequest(`warehouses/deactivate-warehouse/${warehouse ? warehouse.id : ''}`)
            const data = await res.json();
            if (res.ok) {
                toast.success(data.message)
            } else {
                toast.error(data.message)
            }
            setDeleteDialog(false)
        } catch (error) {
            toast.error(error instanceof Error? error.message : "Failed to deactivate warehouse")
        } finally {
            setIsLoading(false)
            router.refresh()
        }
    }

    async function handleReactivate() {
        setIsLoading(true)
        try {
            const res = await patchRequest({ }, `warehouses/reactivate-warehouse/${ warehouseId }`)
            const data = await res.json();
            if (res.ok) {
                toast.success(data.message)
            } else {
                toast.error(data.message)
            }
            setDeleteDialog(false)
        } catch (error) {
            toast.error(error instanceof Error? error.message : "Failed to reactivate warehouse")
        } finally {
            setIsLoading(false)
            router.refresh()
        }
    }

    function exitEditDialog() {
        setEditDialog(false);
        setDeleteDialog(false);
    }

    async function handleEditWarehouse(warehouseNameValue: string, selectedCity: string, address: string, assignedAdmin: string, existingAdmin: IAdmin) {
        setIsLoading(true)
        try {
            if (warehouseNameValue) {
                if ((selectedCity == warehouse?.city_id && address == warehouse?.address) && (warehouseNameValue == warehouse.warehouseName && (assignedAdmin || existingAdmin?.id) == warehouse.adminID)) {
                    toast.warning('You have not made any changes, yet')
                } else {
                    const res = await patchRequest({ selectedCity, address, warehouseName: warehouseNameValue, assignedAdmin: assignedAdmin || existingAdmin?.id || '' }, `warehouses/${warehouse?.id}`)
                    const data = await res.json();
                    if (res.ok) {
                        toast.success(data.message)
                        setEditDialog(false)
                        setDeleteDialog(false)
                        router.refresh()
                    } else {
                        toast.error(data.message)
                    }
                }
            }
        } catch (error) {
            if (error instanceof Error) toast.error(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (!("isActive" in row.original)) {
            toast.error("isActive field is missing in row data.")
        }
    }, [row]);

  return (
    <>
      <AlertDialog open={editDialog == true ? false : deleteDialog} onOpenChange={setDeleteDialog}>
            <DropdownMenu>
                <DropdownMenuTrigger onClick={() => setOpenDropdown(true)} className="rounded-md drop-shadow-2xl p-1 h-fit cursor-pointer">
                    <PiDotsThreeVerticalBold size={`1.5rem`} />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem>
                    <AlertDialogTrigger onClick={() => setEditDialog(true)} className="flex gap-1 items-center cursor-pointer">
                        <PiPencilBold size={`1.2rem`} />
                        Edit <span className="font-semibold">{warehouseName}</span> warehouse
                    </AlertDialogTrigger>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        {
                            isActive ?
                                <ToolTip content={`Deactivating warehouse does not delete its data`}>
                                    <AlertDialogTrigger onClick={() => setDeleteDialog(true)} className="flex gap-1 items-center cursor-pointer">
                                        <PiXCircleBold className="fill-red-400" size={`1.2rem`} />
                                        Deactivate <span className="font-semibold">{warehouseName}</span> warehouse
                                    </AlertDialogTrigger>
                                </ToolTip>
                            :
                                <ToolTip content={`Reactivating warehouse restores its data`}>
                                    <AlertDialogTrigger onClick={() => setDeleteDialog(true)} className="flex gap-1 items-center cursor-pointer">
                                        <PiLightningFill className="fill-yellow-400" size={`1.2rem`} />
                                        Reactivate <span className="font-semibold">{warehouseName}</span> warehouse
                                    </AlertDialogTrigger>
                                </ToolTip>
                        }
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        {
                            isActive ?
                            `Are you sure you want to deactivate ${warehouseName} warehouse?`
                            :
                            `Are you sure you want to reactivate ${warehouseName} warehouse?`
                        }
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        {
                            isActive ?
                            `This action will deactivate ${warehouseName} warehouse & the assigned admin will be dismissed. The deactivated warehouse will not operate. However, the related data will not be deleted from the database.`
                            :
                            `This action will reactivate ${warehouseName} warehouse. Warehouse will soon start operating and the related data will be restored.`
                        }
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <LoadingButton loading={isLoading} onClick={isActive ? handleDeactivate : handleReactivate}>
                        {
                            isActive ?
                            `Yes, deactivate ${warehouseName}`
                            :
                            `Yes, reactivate ${warehouseName}`
                        }
                    </LoadingButton>
                </AlertDialogFooter>
            </AlertDialogContent>
      </AlertDialog>
      <DialogWarehouse editFunc={handleEditWarehouse} warehouseData={warehouse} btnText={"Update Warehouse"} editWarehouse={true} setEditDialog={setEditDialog} editDialog={editDialog} optionalCancleFunc={exitEditDialog} />
    </>
  );
};

export const columns: ColumnDef<IWarehouse>[] = [
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
    accessorKey: "warehouseName",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Warehouse Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("warehouseName")}</div>
    ),
  },
  {
    accessorKey: "province",
    cell: ({ row }) => <div className="lowercase">{row.getValue("province")}</div>,
  },
  {
    accessorKey: "city_name",
    cell: ({ row }) => <div className="lowercase">{row.getValue("city_name")}</div>,
  },
  {
    accessorKey: "address",
    cell: ({ row }) => <div className="lowercase">{row.getValue("address")}</div>,
  },
  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) => <div className="flex justify-center"><ActiveIndicator isActive={row.getValue('isActive') && row.getValue('isActive') ? true : false} activeText={`${ row.getValue('warehouseName') && row.getValue('warehouseName') ? row.getValue('warehouseName') : '' } Warehouse is active`} nonActiveText={` ${ row.getValue('warehouseName') && row.getValue('warehouseName') ? row.getValue('warehouseName') : '' } Warehouse is NOT active`} /></div>
  },
  {
    accessorKey: "postal_code",
    cell: ({ row }) => <div className="lowercase">{row.getValue("postal_code")}</div>,
  },
  {
    accessorKey: "adminID",
    header: () => <span className="truncate">Assigned Admin</span>,
    cell: ({ row }) => <AssignedAdminCell adminID={row.getValue("adminID")} />,
  },
  {
    id: "actions",
    enableHiding: false,
    header: () => {
      return <span>Action</span>
    },
    cell: ActionsCell,
  },
];

export default columns;
