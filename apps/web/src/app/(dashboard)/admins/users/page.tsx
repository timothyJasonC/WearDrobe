import { getRequest } from "@/lib/fetchRequests"
import React from "react"
import DashboardWrapper from "../_components/DashboardWrapper";
import { Input } from "@/components/ui/input";
import { ExpTable } from "../_components/ExpTable";
import columns from "./_components/columns";
import { StatisticsCard } from "../../_components/statisticsCard";

export default async function Page() {
    
    let users = []
    try {
        const res =  await (await getRequest('/user')).json()
        users = res.data;
    } catch (error) {
        return 
    }

    return (
        <DashboardWrapper >
            <h3 className="font-bold text-3xl mb-7">Users</h3>
            <div className="w-72 mb-7">
                <StatisticsCard  title='Total User(s)' number={users && users?.length ? users?.length : 0}/>
            </div>
            {
                users.length > 0 ?
                    <ExpTable accounts={users} columns={columns} />
                    :
                    <div>Users not found</div>
            }
        </DashboardWrapper>
    )
};

