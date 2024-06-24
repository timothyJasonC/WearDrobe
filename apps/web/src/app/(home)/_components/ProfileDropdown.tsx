import { Button } from "@/components/ui/button"
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuGroup,
    DropdownMenuItem, DropdownMenuPortal, DropdownMenuSeparator,
    DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { PiGear, PiReceipt, PiSignOut, PiUser, PiUserCircle } from "react-icons/pi"

export function ProfileDropdown() {

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className="border-0 focus-visible:ring-black/0 focus-visible:border-black/60">
                <Button variant="outline"><PiUser size={`20px`} /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuGroup>
                    <Link href={'/user/edit-profile'}>
                        <DropdownMenuItem className="flex gap-2 cursor-pointer">
                            <PiUserCircle size={`16px`} />
                            <span>Profile</span>
                        </DropdownMenuItem>
                    </Link>
                    <Link href={'/user/transaction'}>
                        <DropdownMenuItem className="flex gap-2 cursor-pointer">
                            <PiReceipt size={`16px`} />
                            <span>Transaction</span>
                        </DropdownMenuItem>
                    </Link>
                    {/* <DropdownMenuSub>
                        <DropdownMenuSubTrigger className="flex gap-2">
                            <PiGenderFemale size={'16px'} />
                            <span>Women</span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                                <DropdownMenuItem>
                                    <span>category 1</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <span>category 2</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <span>category 3</span>
                                </DropdownMenuItem>
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger className="flex gap-2">
                            <PiGenderMale size={'16px'} />
                            <span>Men</span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                                <DropdownMenuItem>
                                    <span>category 1</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <span>category 2</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <span>category 3</span>
                                </DropdownMenuItem>
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub> */}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem className="flex gap-2 cursor-pointer">
                        <PiGear size={`16px`} />
                        <span>Settings</span>
                    </DropdownMenuItem>
                    {/* <DropdownMenuItem className="flex gap-2">
                        <PiShoppingCartSimple size={`16px`} />
                        <span>Cart</span>
                        <div className="bg-red-400 w-6 h-6 rounded-full absolute right-2 flex justify-center items-center">
                            <span className="text-white text-xs flex justify-center items-center font-light scale-[92%]">99+</span>
                        </div>
                    </DropdownMenuItem> */}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex gap-2 cursor-pointer">
                    <PiSignOut size={`16px`} />
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
