import { Button } from "@/components/ui/button"
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuGroup,
    DropdownMenuItem, DropdownMenuPortal, DropdownMenuSeparator,
    DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { PiFireSimple, PiGenderFemale, PiGenderMale, PiHeart, PiList, PiMagnifyingGlass, PiMapPinSimple, PiPassword, PiReceipt, PiShoppingCartSimple, PiSignIn, PiSignOut, PiUser } from "react-icons/pi"
import { Input } from "../../../components/ui/input"
import Cart from "@/components/cart/Cart"
import { handleLogout } from "@/lib/utils"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
  
export function HeaderDropdown({ userLogged, router }: { userLogged: boolean, router: AppRouterInstance }) {
    
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
                {
                    userLogged &&
                    <>
                        <DropdownMenuGroup>
                            <DropdownMenuItem className="flex gap-2" onClick={() => { router.push('/user/wishlist') } }>
                                <PiHeart size={`16px`} />
                                <span>Wishlist</span>
                                {/* <div className="bg-red-400 w-6 h-6 rounded-full absolute right-2 flex justify-center items-center">
                                    <span className="text-white text-xs flex justify-center items-center font-light scale-[92%]">99+</span>
                                </div> */}
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex gap-2" onClick={() => { router.push('/user/transaction') } }>
                                <PiReceipt size={`16px`} />
                                <span>Order History</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex gap-2">
                                <PiShoppingCartSimple size={`16px`} />
                                <span>Cart</span>
                                <div className="absolute right-2">
                                    <Cart />
                                </div>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator/>
                            <DropdownMenuItem className="flex gap-2" onClick={() => { router.push('/user/edit-profile') } }>
                                <PiUser size={`16px`} />
                                <span>Edit Profile</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex gap-2" onClick={() => { router.push('/user/manage-address') } }>
                                <PiMapPinSimple size={`16px`} />
                                <span>Manage Address</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex gap-2" onClick={() => { router.push('/user/change-password') } }>
                                <PiPassword size={`16px`} />
                                <span>Change Password</span>
                            </DropdownMenuItem>

                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                    </>
                    
                }
                {
                    userLogged ?
                    <DropdownMenuItem onClick={() => { handleLogout(); router.push('/auth') } } className="flex gap-2">
                        <PiSignOut size={`16px`} />
                        <span>Logout</span>
                    </DropdownMenuItem>
                    :
                    <DropdownMenuItem onClick={() => { router.push('/auth') } } className="flex gap-2">
                        <PiSignIn size={`16px`} />
                        <span>Login</span>
                    </DropdownMenuItem>
                }
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
  