import React from "react"
import BestSeller from "./BestSeller"
import { toast } from "sonner"
import { getCatalog } from "@/app/action"
import { IProduct } from "@/constants"

export default async function MenChoice() {

    let menChoice: IProduct[] | []  = []
    try {
        const res = await getCatalog('men', '', '', '', '', '1', '5')
        menChoice = res.productList;

    } catch (error) {
        toast.error(error instanceof Error ? error.message: "Error fetching Women products")
    }

    return (
        <div className="flex justify-center">
            <BestSeller data={menChoice} all={false} headerText={"Men's Choice"} totalCol="sm:basis-1/2" />
        </div>
    )
};

