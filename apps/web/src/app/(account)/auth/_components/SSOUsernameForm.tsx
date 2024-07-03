'use client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { postRequest } from "@/lib/fetchRequests"
import { toast } from "sonner"
import { useState } from "react"
import { PiWarningCircle } from "react-icons/pi"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import Cookies from "js-cookie"
import { setCurrentAccount } from "@/lib/redux/features/authSlice"
import { useDispatch } from "react-redux"
  
export function SSOUsernameForm({ SSOUserData, router }: { SSOUserData: any, router: AppRouterInstance }) {
    const [ username, setUsername ] = useState<string>('');
    const dispatch = useDispatch()

    function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
        setUsername(event.target.value)
    }

    async function updateUsername() {
        const { user } = SSOUserData;
        const userData = {
            accountActive: user.emailVerified, username: username,
            email: user.email, imgUrl: user.photoURL
        }
        try {
            const res = await postRequest(userData, '/user/create-sso-user');
            const formDialog = document.getElementById('username-form');
            const data = await res.json();
                if (res.status == 200 || res.status == 201) {
                    formDialog?.classList.remove('flex')
                    formDialog?.classList.add('hidden')
                    Cookies.set('role', data.data.role, { expires: 1 })
                    Cookies.set('token', data.data.token, { expires: 1 })
                    dispatch(setCurrentAccount(data.data.user))
                    toast.success(`Hello, ${userData.username}`, { description: 'Welcome to WearDrobe!' })
                    setTimeout(() => { router.push('/') }, 2000);
                } else if (res.status == 409) {
                    toast.error("Username has been taken")
                    formDialog?.classList.add('flex')
                    formDialog?.classList.remove('hidden')
                } else {
                    toast.error("Request error")
                }
        } catch (error) {
            toast.error("Server error")
        }
    }

    return (
        <div id="username-form" className="absolute top-0 bottom-0 left-0 right-0 hidden justify-center items-center bg-black/30">
            <div className="max-w-96 border-2 border-black/20 p-4 rounded-xl bg-white">
                <div className="flex gap-2 items-center">
                    <PiWarningCircle size={`1.2rem`} />
                    <h3 className=" text-lg font-bold">Oops, username has been taken!</h3>
                </div>
                <p className="text-black/40">Please choose different username. Click save to confirm your changes.</p>
                <div className="items-center flex flex-col lg:gap-2 gap-16 sm:gap-6"></div>
                <div className="grid gap-4 py-4 relative">
                    <div className="grid grid-cols-4 items-center gap-4 ">
                        <Label htmlFor="username" className="text-right">
                            Username
                        </Label>
                        <Input
                            id="username"
                            onChange={handleOnChange}
                            value={username}
                            placeholder="@example: Peter Parker"
                            className="col-span-3 focus-visible:ring-black/20"
                        />
                    </div>
                    <span className="text-black/50 font-light text-sm">*username must at least contain 6 characters</span>    
                </div>  
                <div className="flex justify-end lg:mt-4 mt-0">
                    {
                        username.length > 5 ?
                        <Button onClick={updateUsername} type="submit">Save changes</Button>
                        :
                        <Button disabled type="submit">Save changes</Button>
                    }
                </div>
            </div>
        </div>
    )
}
  
