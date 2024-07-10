import React from "react"
import DashboardWrapper from "../_components/DashboardWrapper";
import { getAdminServerSide } from "@/lib/utils";
import { cookies } from "next/headers";
import EditAdmin from "../edit-profile/_components/EditAdmin";
import Wrapper from "@/app/(home)/(user-dashboard)/_components/Wrapper";
import AlertDialogResetPass from "@/app/(home)/(user-dashboard)/user/change-password/_components/AlertDialogResetPass";

export default async function Page() {
    const admin = await getAdminServerSide(cookies);

    return (
        <DashboardWrapper className="flex gap-4 lg:h-fit flex-col md:flex-row justify-start">
            <EditAdmin admin={admin} />
            <Wrapper title={"Change Password"} className={"border-2 w-full xl:w-[47rem] p-4"}>
                <p className="text-black/60 text-xs mb-4">*You can reset your password once for each request</p>
                <AlertDialogResetPass confirmText={'Make Request'} cancelText={'Cancel'} email={admin && admin?.email} />
            </Wrapper>
        </DashboardWrapper>
    )
};

