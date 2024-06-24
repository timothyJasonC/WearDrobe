import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import React from "react"
import { PiMapPinFill, PiMapPinSimpleFill } from "react-icons/pi"

export default function AddressCard() {
    return (
        <div className="border-[1px] border-black/20 w-full h-52 rounded-sm">
            <div className="flex justify-between items-center p-4">
                <h3 className="font-semibold">Address Label Title</h3>
                <Button className="flex gap-2 ">Set as main address</Button>
            </div>
            <Separator />
            <div className="p-4 text-black/40">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia rem voluptatem neque iusto ratione velit dolores assumenda eos. Unde, ipsa?</p>
            </div>
        </div>
    )
};

