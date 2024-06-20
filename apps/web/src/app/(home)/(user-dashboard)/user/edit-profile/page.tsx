import React from "react"
import Wrapper from "../../_components/Wrapper"
import EditProfileForm from "./_components/EditProfileForm"
import { getUserServerSide } from "@/lib/utils"
import { cookies } from 'next/headers'

export default async function Page() {

    const user = await getUserServerSide(cookies)

    return (
        <Wrapper title={"Edit Profile"} className={""} >
            <EditProfileForm user={user} />
        </Wrapper>
    )
};

