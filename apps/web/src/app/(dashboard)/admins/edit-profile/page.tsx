import React from "react"
import DashboardWrapper from "../_components/DashboardWrapper"
import AdminMenu from "@/components/sidebar/AdminMenu";
import { cookies } from "next/headers";
import { getAdminServerSide } from "@/lib/utils";
import EditAdmin from "./_components/EditAdmin";
import Wrapper from "@/app/(home)/(user-dashboard)/_components/Wrapper";
import EditProfileAdminForm from "./_components/EditProfileAdminForm";

export default async function Page() {

    const admin = await getAdminServerSide(cookies);

    return (
        <DashboardWrapper className="flex gap-4 lg:h-fit flex-col md:flex-row justify-start">
            <EditAdmin admin={admin} />
            <Wrapper title={"Edit Profile"} className={"lg:border-2 w-full xl:w-[47rem]"}>
                <EditProfileAdminForm admin={admin} />
            </Wrapper>
        </DashboardWrapper>
    )
};

