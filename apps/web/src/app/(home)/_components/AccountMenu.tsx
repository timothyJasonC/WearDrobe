import React, { useEffect, useState } from "react"
import { ProfileDropdown } from "@/app/(home)/_components/ProfileDropdown";
import Cookies from "js-cookie";
import { isTokenExp } from "@/lib/utils";
import { NavigationMenuLink, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import Link from "next/link";
import { PiUser } from "react-icons/pi";
import Cart from "@/components/cart/Cart";

export default function AccountMenu() {

    const [userLogged, setUserLogged] = useState(false);

    useEffect(() => {
        const token = Cookies.get('token')
        const role = Cookies.get('role')
        if (token && (role == 'user' && !isTokenExp(token))) setUserLogged(true)
    }, [])

    return (
        <div>
            {
                userLogged ? (
                    (
                        <div className="flex gap-2 items-center">
                            <ProfileDropdown />
                            <div className="relative">
                                <Cart />
                            </div>
                        </div>
                    )

                )
                    :
                    <Link href="/auth" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}><PiUser size={`20px`} /></NavigationMenuLink>
                    </Link>
            }
        </div>
    )
};

