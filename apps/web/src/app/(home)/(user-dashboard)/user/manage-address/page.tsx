import React from "react"
import Wrapper from "../../_components/Wrapper"
import AddressCard from "./_components/AddressCard"
import { Button } from "@/components/ui/button"
import { PiPlus, PiX } from "react-icons/pi"


export default function Page() {
    return (
        <Wrapper title={"Manage Address"} className={""} >
            <Button className="absolute top-4 right-4 flex gap-2 bg-transparent text-black border-[1px] border-black hover:text-white"><PiPlus />Add New Address</Button>
            <div>
                <AddressCard />
            </div>
        </Wrapper>
    )
};

