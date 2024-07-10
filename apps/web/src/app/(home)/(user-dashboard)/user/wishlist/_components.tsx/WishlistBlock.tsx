import React from "react"
// import WishtlistItem from "./WishListItem"
import { IUser } from "@/app/(dashboard)/admins/users/page"
import { getRequest } from "@/lib/fetchRequests"
import { toast } from "sonner"

export interface IWishlist {
    id: string,
    productId: string,
    userId: string,
    createdAt: Date
}

export default async function WishlistBlocks({ user }: { user: IUser | null }) {

    let wishlist: IWishlist[] | [] ;
    try {
        if (user) {
            const res = await getRequest(`wishlist/${user?.id}`)
            const data = await res.json();
            wishlist = data.data;
        }
    } catch (error) {
        toast.error(error instanceof Error ? error.message : 'error fetching wishlist')
    }

    return (
        <div>
            <WishlistBlocks user={null} />
            {/* <WishtlistItem /> */}
        </div>
    )
};

