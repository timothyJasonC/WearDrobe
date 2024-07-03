"use client"

import * as React from "react"
import {
  ColumnDef,
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
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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
import { Gender, IUser } from "@/app/(home)/(user-dashboard)/user/edit-profile/_components/EditProfileForm"

export enum Role {
    WarAdm = "warAdm",
    SuperAdm = "superAdm"
}

export interface IAdmin {
    id: string;
    role: Role;
    accountActive: boolean;
    fullName?: string;
    email: string;
    password?: string;
    gender?: Gender;
    dob?: Date;
    createdAt: Date;
}

export function ExpTable({ accounts, columns, optionalComp }: { accounts: IUser[] | IAdmin[], columns: any, optionalComp?:any }) {
    const data: IUser[] = accounts
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})
    const [ columnFilterValue, setColumnFilterValue ] = React.useState<any>()
    const [ globalFilter, setGlobalFilter ] = React.useState('') 
    // const columnFilterValue = column.getFilterValue()

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

        // <DebouncedInput
        //     type="number"
        //     min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
        //     max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
        //     value={(columnFilterValue as [number, number])?.[0] ?? ''}
        //     onChange={value =>
        //         column.setFilterValue((old: [number, number]) => [value, old?.[1]])
        //     }
        //     placeholder={`Min ${
        //         column.getFacetedMinMaxValues()?.[0] !== undefined
        //         ? `(${column.getFacetedMinMaxValues()?.[0]})`
        //         : ''
        //     }`}
        //     className="w-24 border shadow rounded"
        // />

    return (
        <div className="w-full">
            <div className="mb-4">
                <div className="flex justify-between">
                    <div className="flex gap-2 sm:gap-4">
                        <Input
                            placeholder="Search..."
                            value={globalFilter}
                            onChange={(e) => setGlobalFilter(e.target.value) }
                            className="max-w-sm"
                        />
                        {/* <Input 
                            type="number"
                            min={Number(table.getColumn('dob')?.getFacetedMinMaxValues()?.[0] ?? '')}
                            max={Number(table.getColumn('dob')?.getFacetedMinMaxValues()?.[1] ?? '')}
                            // value={(columnFilterValue.getFilterValue() as [number, number])?.[0] ?? ''}
                            onChange={value =>
                                table.getColumn('dob')?.setFilterValue((old: [number, number]) => [value, old?.[1]])
                            }
                            placeholder={`Min ${
                                table.getColumn('dob')?.getFacetedMinMaxValues()?.[0] !== undefined
                                ? `(${table.getColumn('dob')?.getFacetedMinMaxValues()?.[0]})`
                                : ''
                            }`}
                        /> */}
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
