'use client'
import { ToolTip } from "@/components/Tooltip"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import { PiDotsThreeVerticalBold, PiPencilBold, PiXCircleBold } from "react-icons/pi"
import { getRequest } from "@/lib/fetchRequests"
import { Warehouse } from "@/constants"
import ActiveIndicator from "@/components/sidebar/ActiveIndicator"
import { IAdmin } from "../../_components/ExpTable"
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { LoadingButton } from "@/components/ui/loading-button"
import { DialogWarehouse } from "./DialogWarehouse"
import { Dialog, DialogContent } from "@/components/ui/dialog"

export const columns: ColumnDef<Warehouse>[] = [
    {
      accessorKey: 'id',
      header: "No",
      cell: ({ row }) => (
        <div className="capitalize">{row.index + 1}</div>
      ),
    },
    {
      accessorKey: "warehouseName",
      header: ({ column }) => {
          return (
            <Button variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
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
      accessorKey: "postal_code",
      cell: ({ row }) => <div className="lowercase">{row.getValue("postal_code")}</div>,
    },
    {
      accessorKey: "adminID",
      header: "Assigned Admin",
      cell: ({ row }) => {

        const [ currentAdmin, setCurrentAdmin ] = useState<IAdmin>();

        useEffect(() => {
            async function getAssignedAdmin() {
                const res = await (await getRequest(`/admin/${row.getValue("adminID")}`)).json()
                const admin = res.data;
                setCurrentAdmin(admin);
            }
            getAssignedAdmin()
        }, [])

        return (
            <ToolTip content={ currentAdmin?.fullName? `Click to see ${ currentAdmin?.fullName }` : 'No admin is assigned, yet' }>
                <Link href={`/admins/admins/${currentAdmin?.id}`}>
                    <div className="lowercase">{ currentAdmin?.fullName? currentAdmin?.fullName  : '-' }</div>
                </Link>
            </ToolTip>
            
        )
      },
    },
    // {
    //   accessorKey: "accountActive",
    //   header: () => <div className="capitalize text-center">Status</div>,
    //   cell: ({ row }) => (
    //       <div className="flex justify-center">
    //         <ActiveIndicator isActive={row.getValue('accountActive')} activeText={"Admin is verified"} nonActiveText={"Admin is NOT verified"} />
    //       </div>
    //   ),
    // },
    {
      id: "actions",
      enableHiding: false,
      header: () => {
        return <span>Action</span>
      }, 
      cell: ({ row }) => {

        async function handleDeleteWarehouse() {
            // setIsloading(true)
            // try {
            //     const res = await deleteRequest(`/admin/${admin.id}`)
            //     const data = await res.json();
            //     if (res.ok) {
            //         toast.success(data.message)
            //         router.push('/admins/admins')
            //     } else {
            //         toast.error(data.message)
            //     }
            //     setDialogOpen(false)
            // } catch (error) {
            //     catchError(error)
            // }
            // setIsloading(false)
        }

        const [ openDropdown, setOpenDropdown ] = useState(false)
        const [ deleteDialog, setDeleteDialog ] = useState(false)
        const [ editDialog, setEditDialog ] = useState(false)
        const [ isLoading, setIsLoading ] = useState(false)

        function exitEditDialog(){
            setEditDialog(false)
            setDeleteDialog(false)
        }

        return (
        <>
            <AlertDialog open={ editDialog == true ? false : deleteDialog} onOpenChange={setDeleteDialog}>
                <DropdownMenu>
                    <DropdownMenuTrigger onClick={() => setOpenDropdown(true)} className="rounded-md drop-shadow-2xl p-1 h-fit cursor-pointer">
                        <PiDotsThreeVerticalBold size={`1.5rem`} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>
                            <AlertDialogTrigger onClick={() => setEditDialog(true)} className="flex gap-1 items-center cursor-pointer">
                                <PiPencilBold size={`1.2rem`} />
                                Edit <span className="font-semibold">{row.getValue('warehouseName')}</span> warehouse
                            </AlertDialogTrigger>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <AlertDialogTrigger onClick={() => setDeleteDialog(true)} className="flex gap-1 items-center cursor-pointer">
                                <PiXCircleBold className="fill-red-400" size={`1.2rem`} />
                                Delete <span className="font-semibold">{row.getValue('warehouseName')}</span> warehouse
                            </AlertDialogTrigger>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Are you sure you want to delete { row.getValue('warehouseName') } warehouse
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete { row.getValue('warehouseName') } warehouse
                            and remove the data from the database.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <LoadingButton loading={ isLoading } onClick={handleDeleteWarehouse}>
                        Yes, delete { row.getValue('warehouseName') }
                        </LoadingButton >
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>  
            <DialogWarehouse btnText={"Update Warehouse"} editWarehouse={true} setEditDialog={setEditDialog} editDialog={editDialog} optionalCancleFunc={exitEditDialog} />
        </>
        )
      },
    },
]

export default columns;