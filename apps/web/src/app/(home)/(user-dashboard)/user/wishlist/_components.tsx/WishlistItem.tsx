import { formatToIDR } from "@/lib/utils"
import React from "react"
import { PiHeart } from "react-icons/pi"
import Image from "next/image"
import { IProduct } from "@/constants"
import { IWishlist } from "./WishlistBlock"

export default function WishtlistItem({ item }: { item: IWishlist }) {

    // fetch product by id (product name, price & thumbnail)

    return (
        <div>
            <div className="cursor-pointer relative w-full">
                {/* <Image
                    priority
                    width={350} height={100}
                    className="rounded-lg w-full" src={item.} alt="" 
                /> */}
            </div>
            <div className="flex justify-between items-center">
                <div>
                    {/* <p className="font-semibold">{ item.name }</p>
                    <p className="font-light">{ formatToIDR(item.price) }</p> */}
                </div>

                <div className="cursor-pointer"><PiHeart size={`24px`} /></div>
            </div>
        </div>
    )
};

