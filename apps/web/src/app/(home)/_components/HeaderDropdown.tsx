import { Button } from "@/components/ui/button"
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuGroup,
    DropdownMenuItem, DropdownMenuPortal, DropdownMenuSeparator,
    DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { PiFireSimple, PiGenderFemale, PiGenderMale, PiHeart, PiList, PiMagnifyingGlass, PiMapPinSimple, PiPassword, PiReceipt, PiShoppingCartSimple, PiSignIn, PiSignOut, PiStackSimple, PiUser } from "react-icons/pi"
import { Input } from "../../../components/ui/input"
import Cart from "@/components/cart/Cart"
import { handleLogout, shuffleArray } from "@/lib/utils"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Search } from "../../../components/search";
import { ICategory, IProduct } from "@/constants"
  
export function HeaderDropdown({ userLogged, router, menCategories, womenCategories }: { userLogged: boolean, router: AppRouterInstance, menCategories: ICategory[] | [], womenCategories: ICategory[] | [] }) {
    
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline"><PiList size={`20px`} /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 md:hidden">
                <Search />
                <Link href={`/catalogs`}>
                    <DropdownMenuItem className="flex items-center justify-between">
                        <div className="flex gap-2">
                            <PiStackSimple size={`1rem`} />
                            <span>Catalog</span>
                        </div>
                        <Badge className="bg-red-400 font-light">Hot</Badge>
                    </DropdownMenuItem>
                </Link>

                <DropdownMenuSub>
                    <DropdownMenuSubTrigger className="flex items-center gap-2">
                        <PiGenderMale size={'16px'} />
                        <span>Women</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                            {
                                womenCategories && womenCategories.length > 0 ?
                                shuffleArray(womenCategories).map((item: ICategory) => (
                                    <Link href={`/catalogs?g=women&t=${item.type}&c=${item.slug}`}>
                                        <DropdownMenuItem key={item.id}>
                                            { item.category }
                                        </DropdownMenuItem>
                                    </Link>
                                ))
                                :
                                <></>
                            }
                        </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                </DropdownMenuSub>

                <DropdownMenuSub>
                    <DropdownMenuSubTrigger className="flex items-center gap-2">
                        <PiGenderMale size={'16px'} />
                        <span>Men</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                            {
                                menCategories && menCategories.length > 0 ?
                                shuffleArray(menCategories).map((item: ICategory) => (
                                    <Link href={`/catalogs?g=men&t=${item.type}&c=${item.slug}`}>
                                        <DropdownMenuItem key={item.id}>
                                            { item.category }
                                        </DropdownMenuItem>
                                    </Link>
                                ))
                                :
                                <></>
                            }
                        </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                </DropdownMenuSub>

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
  