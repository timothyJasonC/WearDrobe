import React from "react"
import DashboardWrapper from "../_components/DashboardWrapper"
import { DialogWarehouse } from "./_components/DialogWarehouse"
import { ExpTable } from "../_components/ExpTable"
import { getRequest } from "@/lib/fetchRequests"
import columns from "./_components/columns"
import { StatisticsCard } from "../../_components/statisticsCard"

export default async function Page() {

    let warehouses = []
    try {
        const res =  await (await getRequest('/warehouses/all/')).json()
        warehouses = res.data;
    } catch (error) {
        return 
    }

    return (
        <DashboardWrapper>
            <div className="mb-[6rem] flex justify-between">
                <div className="w-72">
                    <StatisticsCard  title='Total Warehouse(s)' number={warehouses && warehouses?.length > 0 ? warehouses?.length : 0}/>
                </div>
                <DialogWarehouse btnText={"Create New Warehouse"} editWarehouse={false} />
            </div>
            {
                warehouses?.length > 0 ?
                    <ExpTable accounts={warehouses} columns={columns} optionalComp={<DialogWarehouse btnText={"Create New Warehouse"} editWarehouse={true} />} />
                    :
                    <div>Warehouse not found</div>
            }
        </DashboardWrapper>
    )
};

