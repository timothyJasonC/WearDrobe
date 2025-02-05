import { getRequest } from "@/lib/fetchRequests"
import React from "react"
import DashboardWrapper from "../_components/DashboardWrapper";
import { ExpTable } from "../_components/ExpTable";
import columns from "./_components/columns";
import { StatisticsCard } from "../../_components/statisticsCard";
import { Gender } from "@/app/(home)/(user-dashboard)/user/edit-profile/_components/EditProfileForm";
import DashboardHeaderPhoto from "../_components/DashboardHeaderPhoto";

export interface IUser {
    id: string;
    accountActive: boolean | null;
    username?: string | null | undefined;
    email: string;
    password?: string | null | undefined;
    gender?: Gender | null | undefined;
    dob?: Date | null | undefined;
    createdAt: Date;
    imgUrl?: string | null | undefined;
}

export default async function Page() {
    
    let users: IUser[] | [] = []
    try {
        const res =  await (await getRequest('user')).json()
        users = res.data;
    } catch (error) {
        return 
    }    

    return (
        <DashboardWrapper className="relative">
            <DashboardHeaderPhoto 
                precisePos="50% 22%"
                imgUrl={"https://images.pexels.com/photos/3965548/pexels-photo-3965548.jpeg"} 
            />
            <div className="w-72 mb-[6rem] z-[0] relative">
                <StatisticsCard  title='Total User(s)' number={users && users?.length ? users?.length : 0}/>
            </div>
            <ExpTable users={users ? users : []} accounts={users ? users : []} columns={columns} />
        </DashboardWrapper>
    )
};

