import React from "react"
import DashboardWrapper from "../_components/DashboardWrapper"
import { DialogWarehouse } from "./_components/DialogWarehouse"
import { ExpTable } from "../_components/ExpTable"
import { getRequest } from "@/lib/fetchRequests"
import columns from "./_components/columns"
import { StatisticsCard } from "../../_components/statisticsCard"

export default async function Page() {

    const warehouses = await (await getRequest('/warehouses')).json()
    console.log(warehouses)

    return (
        <DashboardWrapper>
            {/* <div className='flex flex-col w-full items-end mb-7'>
                <DialogWarehouse btnText={"Create New Warehouse"} editWarehouse={false} />
            </div> */}
            <div className="mb-[6rem] flex justify-between">
                <div className="w-72">
                    <StatisticsCard  title='Total Warehouse(s)' number={warehouses.length}/>
                </div>
            </div>
            <ExpTable accounts={warehouses} columns={columns} optionalComp={<DialogWarehouse btnText={"Create New Warehouse"} editWarehouse={false} />} />
        </DashboardWrapper>
    )
};

