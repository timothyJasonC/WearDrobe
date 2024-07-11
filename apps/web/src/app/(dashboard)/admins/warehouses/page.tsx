import React from "react"
import DashboardWrapper from "../_components/DashboardWrapper"
import { DialogWarehouse } from "./_components/DialogWarehouse"
import { ExpTable } from "../_components/ExpTable"
import { getRequest } from "@/lib/fetchRequests"
import columns, { IWarehouse } from "./_components/columns"
import { StatisticsCard } from "../../_components/statisticsCard"
import DashboardHeaderPhoto from "../_components/DashboardHeaderPhoto"

export default async function Page() {

    let warehouses: IWarehouse[] | [] = []
    try {
        const res =  await (await getRequest('warehouses/all/')).json()
        warehouses = res.data;
    } catch (error) {
        return 
    }

    return (
        <DashboardWrapper className="relative">
            <DashboardHeaderPhoto objectPosition="object-top" altText="Picture of a container truck" imgUrl={"https://images.unsplash.com/photo-1700431449171-f76f36146473?q=80&w=2101&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} />
            <div className="mb-[6rem] flex justify-between z-[1] relative">
                <div className="w-72">
                    <StatisticsCard  title='Total Warehouse(s)' number={warehouses && warehouses?.length > 0 ? warehouses?.length : 0}/>
                </div>
                <div className="max-lg:hidden"><DialogWarehouse btnText={"Create New Warehouse"} editWarehouse={false} /></div>
            </div>
            <ExpTable warehouses={warehouses} accounts={warehouses} columns={columns} optionalComp={<div className="lg:hidden"><DialogWarehouse btnText={"Create New Warehouse"} editWarehouse={false} /></div>
            } />
        </DashboardWrapper>
    )
};

