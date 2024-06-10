"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { PiShoppingCartSimple, PiFireSimple, PiUser, PiHeart  } from "react-icons/pi";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

import { Input } from "@/components/ui/input"
import { HeaderDropdown } from "./landingPage/HeaderDropdown";

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
    <div className="p-4 flex justify-center border-b-[1px]">
        <NavigationMenu>
            <NavigationMenuList>

                <NavigationMenuItem>
                    <Link href="/" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            WearDrobe
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <Input type="text" placeholder="Search" className="focus-visible:ring-0 focus-visible:border-black/50" />
                </NavigationMenuItem>

                <div className="hidden md:flex">
                    <NavigationMenuItem>
                        <Link href="/docs" legacyBehavior passHref>
                            <NavigationMenuLink className={`${navigationMenuTriggerStyle()} flex gap-2`}>
                                New Arrival <PiFireSimple fontSize={`1rem`} className=" text-black" />
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        <NavigationMenuTrigger>Women</NavigationMenuTrigger>
                        <NavigationMenuContent>
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

                    <NavigationMenuItem>
                        <NavigationMenuTrigger>Men</NavigationMenuTrigger>
                        <NavigationMenuContent>
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
                        <Link href="/auth" legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                <PiUser size={`20px`} />
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        <Link href="/docs" legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                <div className="relative">
                                    <PiShoppingCartSimple size={`20px`} />
                                    <div className="bg-red-400 w-6 h-6 rounded-full absolute -top-4 -right-4 border-2 border-white flex justify-center items-center">
                                        <span className="text-white text-xs flex justify-center items-center font-light scale-[80%]">99+</span>
                                    </div>
                                </div>
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                </div>

                <NavigationMenuItem className="md:hidden">
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        <HeaderDropdown />
                        {/* <DropdownMenu>
                            <DropdownMenuTrigger><PiList size={`20px`} /></DropdownMenuTrigger>
                            <DropdownMenuContent className="bg-white text-black border-[1px] drop-shadow-md border-black/10 space-y-2 px-4 py-2 font-light rounded-md">
                                <DropdownMenuItem>
                                    <DropdownMenuSub>
                                        <DropdownMenuSubTrigger>
                                            <UserPlus className="mr-2 h-4 w-4" />
                                            <span>Invite users</span>
                                        </DropdownMenuSubTrigger>
                                        <DropdownMenuPortal>
                                            <DropdownMenuSubContent>
                                                <DropdownMenuItem>
                                                <Mail className="mr-2 h-4 w-4" />
                                                <span>Email</span>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                <MessageSquare className="mr-2 h-4 w-4" />
                                                <span>Message</span>
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem>
                                                <PlusCircle className="mr-2 h-4 w-4" />
                                                <span>More...</span>
                                                </DropdownMenuItem>
                                            </DropdownMenuSubContent>
                                        </DropdownMenuPortal>
                                    </DropdownMenuSub>
                                </DropdownMenuItem>
                                <DropdownMenuItem>Wish List</DropdownMenuItem>
                                <DropdownMenuItem>Profile</DropdownMenuItem>
                                <DropdownMenuItem>Cart</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu> */}
                    </NavigationMenuLink>
                </NavigationMenuItem>

                {/* <NavigationMenuItem>
                    <NavigationMenuTrigger>Women</NavigationMenuTrigger>
                    <NavigationMenuContent>
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
                </NavigationMenuItem> */}

            </NavigationMenuList>
        </NavigationMenu>
    </div>
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
