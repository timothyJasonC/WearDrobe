import React from "react"
import BestSeller from "./BestSeller"
import { toast } from "sonner"
import { getCatalog } from "@/app/action"
import { IProduct } from "@/constants"

export default async function WomenChoice() {

    let womenProducts: IProduct[] | []  = []
    try {
        const res = await getCatalog('women', '', '', '', '', '1', '5')
        womenProducts = res.productList;

    } catch (error) {
        toast.error(error instanceof Error ? error.message: "Error fetching Women products")
    }

    return (
        <div className="flex justify-center">
            <BestSeller data={womenProducts} all={false} headerText={"Women's Choice"} totalCol="sm:basis-1/2" />
        </div>
    )
};

