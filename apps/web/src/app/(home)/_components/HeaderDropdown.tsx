import { Button } from "@/components/ui/button"
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuGroup,
    DropdownMenuItem, DropdownMenuPortal, DropdownMenuSeparator,
    DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { PiFireSimple, PiGenderFemale, PiGenderMale, PiHeart, PiList, PiMagnifyingGlass, PiShoppingCartSimple, PiSignOut, PiUser } from "react-icons/pi"
import { Input } from "../../../components/ui/input"
import Cart from "@/components/cart/Cart"
import { handleLogout } from "@/lib/utils"
import { useRouter } from "next/navigation"
  
export function HeaderDropdown({userLogged}: any) {
    const router = useRouter()
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline"><PiList size={`20px`} /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 md:hidden">
                <div className="relative">
                    <Input type="text" placeholder="Search" className="focus-visible:ring-0 focus-visible:border-black/50" />
                    <PiMagnifyingGlass className="absolute top-0 bottom-0 right-4 m-auto fill-black/50" />
                </div>            
                <DropdownMenuGroup>
                    <DropdownMenuItem className="flex gap-2">
                        <PiFireSimple size={'16px'} />
                        <span>New Arrival</span>
                    </DropdownMenuItem>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger className="flex gap-2">
                            <PiGenderFemale size={'16px'} />
                            <span>Women</span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent className="md:hidden">
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
                            <DropdownMenuSubContent className="md:hidden">
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
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem className="flex gap-2">
                        <PiUser size={`16px`} />
                        <span>Account</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex gap-2">
                        <PiHeart size={`16px`} />
                        <span>Wishlist</span>
                        <div className="bg-red-400 w-6 h-6 rounded-full absolute right-2 flex justify-center items-center">
                            <span className="text-white text-xs flex justify-center items-center font-light scale-[92%]">99+</span>
                        </div>
                    </DropdownMenuItem>
                    
                    <DropdownMenuItem className="flex gap-2">
                        <PiShoppingCartSimple size={`16px`} />
                        <span>Cart</span>
                        {
                            userLogged ? (
                                        <div className="absolute right-2">
                                            <Cart />
                                        </div>
                            ) : (
                                ''
                            )
                        }
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => { handleLogout(); router.push('/auth') } } className="flex gap-2">
                    <PiSignOut size={`16px`} />
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
  