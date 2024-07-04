import React from "react"
import { DialogCreateAdmin } from "./_components/DialogCreateAdmin"
import DashboardWrapper from "../_components/DashboardWrapper"
import { getRequest } from "@/lib/fetchRequests"
import columns from "./_components/columns"
import { ExpTable } from "../_components/ExpTable"
import { StatisticsCard } from "../../_components/statisticsCard"

export default async function Page() {

    let admins = []
    try {
        const res =  await (await getRequest('/admin')).json()
        admins = res.data;
    } catch (error) {
        return 
    }

    return (
        <DashboardWrapper>
            <div className="mb-[6rem] flex justify-between">
                <div className="w-72">
                    <StatisticsCard  title='Total Admin(s)' number={admins && admins?.length ? admins?.length : 0}/>
                </div>
            </div>
            {
                admins.length > 0 ?
                    <ExpTable accounts={admins} columns={columns} optionalComp={<DialogCreateAdmin />} />
                    :
                    <div>Admins not found</div>
            }
        </DashboardWrapper>
            
    )
};

