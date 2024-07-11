'use client'
import React, { useEffect, useState } from "react"
import BestSeller from "./BestSeller"
import { toast } from "sonner"
import { IProduct } from "@/constants"

export default function WomenChoice() {
    const [ womenProducts, setWomenProducts ] = useState<IProduct[] | []>();

    async function getWomenProducts() {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}products/catalogs?g=${'women'}&t=${''}&c=${''}&q=${''}&s=${''}&p=${'1'}&l=${'5'}`, {
                method: 'GET',
            })
            const data = await res.json()
            setWomenProducts(data.productList)
        } catch (error) {
            toast.error(error instanceof Error ? error.message: "Error fetching Women products")
        }
    }

    useEffect(() => {
        getWomenProducts()
    }, [])

    return (
        <div className="flex justify-center">
            <BestSeller data={womenProducts ? womenProducts : []} all={false} headerText={"Women's Choice"} totalCol="sm:basis-1/3" />
        </div>
    )
};

