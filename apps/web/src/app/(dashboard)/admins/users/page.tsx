import { getRequest } from "@/lib/fetchRequests"
import React from "react"
import DashboardWrapper from "../_components/DashboardWrapper";
import { TableUser } from "./_components/TableUser";
import { StatisticsCard } from "@/components/admDashboard/statisticsCard";
import { Input } from "@/components/ui/input";
import { ExpTable } from "../_components/ExpTable";
import columns from "./_components/columns";

export default async function Page() {
    
    const res = await (await getRequest('/user')).json()
    const users = res.data;
    console.log(users)  


    return (
        <DashboardWrapper >
            {/* <h3 className="font-bold text-3xl mb-7">Users</h3> */}
            <div className="w-72 mb-7">
                <StatisticsCard  title='Total User(s)' number={users.length}/>
            </div>
            {/* <Input
                placeholder="Filter emails..."
                value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
                onChange={(event) =>
                    table.getColumn("email")?.setFilterValue(event.target.value)
                }
                className="max-w-sm"
            /> */}
            <ExpTable accounts={users} columns={columns} />
            {/* <TableUser heads={heads} data={users} /> */}
            
        </DashboardWrapper>
    )
};

