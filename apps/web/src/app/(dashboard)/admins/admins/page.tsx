import React from "react"
import { DialogCreateAdmin } from "./_components/DialogCreateAdmin"
import DashboardWrapper from "../_components/DashboardWrapper"
import { getRequest } from "@/lib/fetchRequests"
import columns from "./_components/columns"
import { ExpTable } from "../_components/ExpTable"
import { StatisticsCard } from "../../_components/statisticsCard"

export default async function Page() {

    const res = await (await getRequest('/admin/')).json()
    const admins = res.data;
    // NOTE: assign warehouse

    return (
        <DashboardWrapper>
            <div className="mb-[6rem] flex justify-between">
                <div className="w-72">
                    <StatisticsCard  title='Total Admin(s)' number={admins.length}/>
                </div>
            </div>
            <ExpTable accounts={admins} columns={columns} optionalComp={<DialogCreateAdmin />} />
        </DashboardWrapper>
            
    )
};

