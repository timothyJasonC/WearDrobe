'use client'
import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { PiShoppingCartSimple, PiFireSimple, PiHeart, PiMagnifyingGlass, PiUser } from "react-icons/pi";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"
import { Input } from "@/components/ui/input"
import { HeaderDropdown } from "../app/(home)/_components/HeaderDropdown";
import { ProfileDropdown } from "@/app/(home)/_components/ProfileDropdown";
import Cookies from "js-cookie";
import Cart from "./cart/Cart";
import AccountMenu from "@/app/(home)/_components/AccountMenu";
import CatalogDropdown from "@/app/(home)/_components/CatalogDropdown";

const components: { title: string; href: string; description: string }[] = [
    {
        title: "Alert Dialog",
        href: "/docs/primitives/alert-dialog",
        description:
            "A modal dialog that interrupts the user with important content and expects a response.",
    },
    {
        title: "Hover Card",
        href: "/docs/primitives/hover-card",
        description:
            "For sighted users to preview content available behind a link.",
    },
    {
        title: "Progress",
        href: "/docs/primitives/progress",
        description:
            "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
    },
    {
        title: "Scroll-area",
        href: "/docs/primitives/scroll-area",
        description: "Visually or semantically separates content.",
    },
    {
        title: "Tabs",
        href: "/docs/primitives/tabs",
        description:
            "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
    },
    {
        title: "Tooltip",
        href: "/docs/primitives/tooltip",
        description:
            "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
    },
]

export function Header() {
    return (
        <div className="p-4 flex justify-center border-b-[1px] sticky top-0 bg-white z-50">
            <NavigationMenu>
                <NavigationMenuList className="justify-between w-screen md:w-[40rem] lg:w-[50rem] xl:w-[65rem] duration-200">

                    <NavigationMenuItem>
                        <Link href="/" legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                <span className={`font-thin text-xl`}>WearDrobe</span>
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>

                    {/* <NavigationMenuItem className="md:block hidden">
                        <div className="relative">
                            <Input type="text" placeholder="Search" className="focus-visible:ring-0 focus-visible:border-black/50" />
                            <PiMagnifyingGlass className="absolute top-0 bottom-0 right-4 m-auto fill-black/50" />
                        </div>
                    </NavigationMenuItem> */}

                    <div className="hidden md:flex">
                        <NavigationMenuItem>
                            <div className="relative">
                                <Input type="text" placeholder="Search" className="focus-visible:ring-white/0 focus-visible:border-black/80 duration-200" />
                                <PiMagnifyingGlass className="absolute top-0 bottom-0 right-4 m-auto fill-black/50" />
                            </div>
                        </NavigationMenuItem>

                        <div className="hidden lg:flex">
                            <NavigationMenuItem>
                                <Link href="/docs" legacyBehavior passHref>
                                    <NavigationMenuLink className={`${navigationMenuTriggerStyle()} flex gap-2`}>
                                        New Arrival <PiFireSimple fontSize={`1rem`} className=" text-black" />
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <NavigationMenuTrigger>Women</NavigationMenuTrigger>
                                <NavigationMenuContent className="max-lg:hidden">
                                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                                        {components.map((component) => (
                                            <ListItem key={component.title} title={component.title} href={component.href}>
                                                {component.description}
                                            </ListItem>
                                        ))}
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <NavigationMenuTrigger>Men</NavigationMenuTrigger>
                                <NavigationMenuContent className="max-lg:hidden">
                                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                                        {components.map((component) => (
                                            <ListItem
                                                key={component.title}
                                                title={component.title}
                                                href={component.href}
                                            >
                                                {component.description}
                                            </ListItem>
                                        ))}
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </div>

                        <NavigationMenu className="md:block lg:hidden">
                            <CatalogDropdown />
                        </NavigationMenu>
                    </div>

                    <div className="hidden md:flex">
                        <NavigationMenuItem>
                            <Link href="/docs" legacyBehavior passHref>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                    <div className="relative">
                                        <PiHeart size={`20px`} />
                                        <div className="bg-red-400 w-6 h-6 rounded-full absolute -top-4 -right-4 border-2 border-white flex justify-center items-center">
                                            <span className="text-white text-xs flex justify-center items-center font-light scale-[80%]">99+</span>
                                        </div>
                                    </div>
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <AccountMenu />
                        </NavigationMenuItem>
                    </div>

                </NavigationMenuList>
            </NavigationMenu>
        </div >
    )
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"