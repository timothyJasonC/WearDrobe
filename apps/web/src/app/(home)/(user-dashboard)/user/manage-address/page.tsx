import React from "react"
import Wrapper from "../../_components/Wrapper"
import { AddressDialog } from "./_components/AddressDialog"
import { getUserServerSide } from "@/lib/utils"
import { cookies } from "next/headers"
import UserAddressBlock from "./_components/UserAddressBlock"
import { PiPlus } from "react-icons/pi"

export default async function Page() {

    const user = await getUserServerSide(cookies)

    return (
        <Wrapper title={"Manage Address"} className={""} >
            <AddressDialog btnText={"Add New Address"} editAddress={false} >
                <div className="absolute top-4 right-4 flex gap-2 bg-transparent text-black border-[1px] border-black hover:text-white py-2 md:px-4 px-2 items-center rounded-md hover:bg-black">
                    <PiPlus/>
                    <span className="hidden sm:block">Add New Address</span>
                </div>
            </AddressDialog>
            <UserAddressBlock userId={user?.id} />
        </Wrapper>
    )
};

