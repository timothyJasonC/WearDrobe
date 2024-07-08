import React from "react"
import { DialogCreateAdmin } from "./_components/DialogCreateAdmin"
import DashboardWrapper from "../_components/DashboardWrapper"
import { getRequest } from "@/lib/fetchRequests"
import columns from "./_components/columns"
import { ExpTable } from "../_components/ExpTable"
import { StatisticsCard } from "../../_components/statisticsCard"
import DashboardHeaderPhoto from "../_components/DashboardHeaderPhoto"

export default async function Page() {

    let admins = []
    try {
        const res =  await (await getRequest('admin/')).json()
        admins = res.data;
    } catch (error) {
        return 
    }

    return (
        <DashboardWrapper className="relative">
            <DashboardHeaderPhoto 
                precisePos="50% 40%"
                imgUrl={"https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg"} 
            />
            <div className="mb-[6rem] flex justify-between relative z-[1]">
                <div className="w-72">
                    <StatisticsCard  title='Total Admin(s)' number={admins && admins?.length ? admins?.length : 0}/>
                </div>
            </div>
            {
                admins?.length > 0 ?
                    <ExpTable admins={admins} accounts={admins} columns={columns} optionalComp={<DialogCreateAdmin />} />
                    :
                    <div>Admins not found</div>
            }
        </DashboardWrapper>
            
    )
};

