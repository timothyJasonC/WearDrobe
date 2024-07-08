"use client"

import * as React from "react"
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Gender } from "@/app/(home)/(user-dashboard)/user/edit-profile/_components/EditProfileForm"
import ExcelButton from "./ExcelButton"
import { downloadAdminsToExcel, downloadUsersToExcel, downloadWarehousesToExcel } from "@/lib/utils"
import { IWarehouse } from "../warehouses/_components/columns"

export enum Role {
    WarAdm = "warAdm",
    SuperAdm = "superAdm"
}

interface ITableData {

}

interface IAdmin extends ITableData {
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

interface IUser extends ITableData {
    id: string; accountActive: boolean | null;
    username?: string | null | undefined; email: string; password?: string | null | undefined;
    gender?: Gender | null | undefined; dob?: Date | null | undefined;
    createdAt: Date; imgUrl?: string | null | undefined;
}

interface Warehouse extends ITableData {
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

export function ExpTable({ accounts, columns, optionalComp, users, admins, warehouses }: { accounts: ITableData[] , columns: any, optionalComp?:any, users?: IUser[], admins?: IAdmin[], warehouses?: IWarehouse[] }) {
    const data = accounts
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})
    const [ columnFilterValue, setColumnFilterValue ] = React.useState<any>()
    const [ globalFilter, setGlobalFilter ] = React.useState('') 

    const table = useReactTable({
        data,
        columns,
        getFacetedMinMaxValues: getFacetedMinMaxValues(),
        getFacetedRowModel: getFacetedRowModel(),
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            globalFilter,
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
        onGlobalFilterChange: setGlobalFilter,
        onColumnFiltersChange: setColumnFilters,
        onSortingChange: setSorting,
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
    })

    return (
        <div className="w-full z-[1] relative">
            <div className="mb-4">
                <div className="flex justify-between gap-2">
                    <div className="flex gap-2 sm:gap-4">
                        <Input
                            placeholder="Search..."
                            value={globalFilter}
                            onChange={(e) => setGlobalFilter(e.target.value) }
                            className="max-w-sm"
                        />
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="ml-auto">
                                <span className="hidden sm:block">Columns</span>
                                <ChevronDown className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                {table
                                .getAllColumns()
                                .filter((column) => column.getCanHide())
                                .map((column) => {
                                    return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                        column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                    )
                                })}
                            </DropdownMenuContent>
                        </DropdownMenu>
                        {
                            (users || admins || warehouses) && 
                            <ExcelButton func={() => { if (users) downloadUsersToExcel(users); if (admins) downloadAdminsToExcel(admins); if (warehouses) downloadWarehousesToExcel(warehouses) }} />
                        }
                    </div>
                    { optionalComp }
                    
                </div>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                            return (
                                <TableHead key={header.id}>
                                {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                                </TableHead>
                            )
                            })}
                        </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow key={row.id} data-state={row.getIsSelected() && "selected"} >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                        ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center" >No results.</TableCell>
                        </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className="space-x-2">
                    <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                        Previous
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                        Next
                    </Button>
                </div>
            </div>
        </div>
    )
}
