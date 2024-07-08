import { Button } from "@/components/ui/button"
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuGroup,
    DropdownMenuItem, DropdownMenuSeparator,DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { PiMapPinSimple, PiPassword, PiReceipt, PiSignOut, PiUser, PiUserCircle } from "react-icons/pi"
import { useRouter } from "next/navigation"
import { handleLogout } from "@/lib/utils"

export function ProfileDropdown() {
    const router = useRouter()

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
                            <span>Edit Profile</span>
                        </DropdownMenuItem>
                    </Link>
                    <Link href={'/user/manage-address'}>
                        <DropdownMenuItem className="flex gap-2 cursor-pointer">
                            <PiMapPinSimple size={`16px`} />
                            <span>Manage Address</span>
                        </DropdownMenuItem>
                    </Link>
                    <Link href={'/user/change-password'}>
                        <DropdownMenuItem className="flex gap-2 cursor-pointer">
                            <PiPassword size={`16px`} />
                            <span>Change Password</span>
                        </DropdownMenuItem>
                    </Link>
                    <DropdownMenuSeparator/>
                    <Link href={'/user/transaction'}>
                        <DropdownMenuItem className="flex gap-2 cursor-pointer">
                            <PiReceipt size={`16px`} />
                            <span>Order History</span>
                        </DropdownMenuItem>
                    </Link>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => { handleLogout(); router.push('/auth') }} className="flex gap-2 cursor-pointer">
                    <PiSignOut size={`16px`} />
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
