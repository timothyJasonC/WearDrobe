import React from 'react'
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"

import { WarehouseDialog } from './WarehouseDialog'
import { WarehouseTable } from '../admins/products/_components/manageProductModal/warehouseTable'

export const WarehouseField = ({form, color, isOneSize, setWarehouse, assignWarehouse, warehouse, warehouseList, setAssignWarehouse}:{form:any, isOneSize:Boolean, color:any, assignWarehouse:any, warehouse:any, setWarehouse:any, warehouseList:any, setAssignWarehouse:any}) => {
  return (
    <div className=''>
      <FormField
        control={form.control}
        name="warehouse"
        render={() => (
          <FormItem>
            <div className=''>
              <FormLabel className="font-bold text-base">Assign Warehouse</FormLabel>
            </div>
            <FormControl>
              
              <WarehouseDialog 
              setWarehouse={setWarehouse}
              warehouseList={warehouseList}
              setAssignWarehouse={setAssignWarehouse}
              warehouse={warehouse}
              assignWarehouse={assignWarehouse}
              />

            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <WarehouseTable
      assignWarehouse={assignWarehouse}
      setAssignWarehouse={setAssignWarehouse}
      color={color}
      isOneSize={isOneSize}
      />
    </div>
  )
}
