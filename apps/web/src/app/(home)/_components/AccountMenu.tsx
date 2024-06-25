import React from "react"
import { ProfileDropdown } from "@/app/(home)/_components/ProfileDropdown";
import { NavigationMenuLink, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { PiHeart, PiUser } from "react-icons/pi";
import Cart from "@/components/cart/Cart";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export default function AccountMenu({ userLogged, router }: { userLogged: boolean, router: AppRouterInstance }) {

    return (
        <div>
            {
                userLogged ? 
                    <div className="flex gap-2 items-center">
                        <NavigationMenuLink onClick={() => router.push('/user/wishlist')} className={navigationMenuTriggerStyle()}>
                            <div className="relative">
                                <PiHeart size={`20px`} />
                                <div className="bg-red-400 w-6 h-6 rounded-full absolute -top-4 -right-4 border-2 border-white flex justify-center items-center">
                                    <span className="text-white text-xs flex justify-center items-center font-light scale-[80%]">99+</span>
                                </div>
                            </div>
                        </NavigationMenuLink>
                        <div className="relative">
                            <Cart />
                        </div>
                        <ProfileDropdown />
                    </div>
                    :
                        <NavigationMenuLink onClick={() => router.push('/auth')} className={navigationMenuTriggerStyle()}><PiUser size={`20px`} /></NavigationMenuLink>
            }
        </div>
    )
};

