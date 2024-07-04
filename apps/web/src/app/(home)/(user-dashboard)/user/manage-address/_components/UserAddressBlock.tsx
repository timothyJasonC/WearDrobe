'use client'
import React, { useEffect, useState } from "react"
import AddressCard from "./AddressCard"
import { getAddressList } from "@/lib/cart"
import { Skeleton } from "@/components/ui/skeleton"

interface CustomAddressList {
    id: string, coordinate: string, 
    mainAddress: boolean, labelAddress: string, 
    province: string, type: string, 
    city_name: string, postal_code: string
}

export default function UserAddressBlock({ userId }: { userId: string }) {

    const [ currentUserAddressList, setCurrentAddressList ] = useState([]) 
    const [ isLoading, setIsLoading ] = useState(true)
    
    async function getUserAddressList() {
        const userAddressList = await getAddressList(userId)
        if (userAddressList) setIsLoading(false)
        setCurrentAddressList(userAddressList)
    }
    useEffect(() => {
        getUserAddressList()
    }, [ ])

    return (
        <div className="flex flex-col gap-4 lg:max-h-[30rem] max-h-96 overflow-y-scroll">
            {   currentUserAddressList.length > 0 ?
                    !isLoading ?
                    currentUserAddressList.map((address: CustomAddressList) => {
                        return <div key={address.id}>
                            <AddressCard 
                                userId={userId} id={address.id} province={address.province} 
                                type={address.type} city_name={address.city_name} postal_code={address.postal_code}
                                labelAddress={address.labelAddress} coordinate={address.coordinate} mainAddress={address.mainAddress} 
                            />
                        </div>
                    })
                    :
                    <div className="flex flex-col space-y-3">
                        <Skeleton className="h-[10rem] rounded-md" />
                        <Skeleton className="h-[10rem] rounded-md" />
                        <Skeleton className="h-[10rem] rounded-md" />
                    </div>
                :
                <p className="text-black/60">You don&apos;t have any address yet</p>
            }
        </div>
    )
};