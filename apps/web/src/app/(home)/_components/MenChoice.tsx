'use client'
import React, { useEffect, useState } from "react"
import BestSeller from "./BestSeller"
import { toast } from "sonner"
import { IProduct } from "@/constants"

export default function MenChoice() {

    const [ MenProducts, setMenProducts ] = useState<IProduct[] | []>();

    async function getMenProducts() {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}products/catalogs?g=${'men'}&t=${''}&c=${''}&q=${''}&s=${''}&p=${'1'}&l=${'5'}`, {
                method: 'GET',
            })
            const data = await res.json()
            setMenProducts(data.productList)
        } catch (error) {
            toast.error(error instanceof Error ? error.message: "Error fetching Men products")
        }
    }

    useEffect(() => {
        getMenProducts()
    }, [])

    return (
        <div className="flex justify-center">
            <BestSeller data={MenProducts ? MenProducts : []} all={false} headerText={"Men's Choice"} totalCol="sm:basis-1/2" />
        </div>
    )
};

