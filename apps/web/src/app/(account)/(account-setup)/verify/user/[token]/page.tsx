'use client'
import React, { useEffect, useRef, useState } from "react"
import { SetupAccountDialog } from "../../_components/SetupAccountDialog";
import SetupUserAccountForm from "../_components/SetupUserAccountForm";
import { getUserServerSide, isTokenExp } from "@/lib/utils";
import { PiArrowRight, PiCheckBold, PiCheckCircleBold } from "react-icons/pi";
import { getRequest, getRequestToken, refreshToken } from "@/lib/fetchRequests";
import { Spinner } from "@/components/ui/spinner";
import { useParams, useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { IUser } from "@/app/(home)/(user-dashboard)/user/edit-profile/_components/EditProfileForm";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoadingButton } from "@/components/ui/loading-button";

export default function Page() {
    const params = useParams()
    const router = useRouter()
    const [ onlyVerify, setOnlyVerify ] = useState(true);
    const [ verified, setVerified ] = useState(false);
    const [ decodedToken, setDecodedToken ] = useState<{ exp: number, iat: number, id: string, role: string } | undefined>()
    const [ activeToken, setActiveToken ] = useState<string>('')
    const [ user, setUser ] = useState<IUser | null>();
    const [ currentPassword, setCurrentPassword ] = useState('')

    useEffect(() => {
        const token = params.token.toString();
        const decodedToken : undefined | { exp: number, iat: number, id: string, role: string } = jwtDecode(token);
        if (token && decodedToken) setActiveToken(token); setDecodedToken(decodedToken)

        async function getUser() {
            try {
                if (decodedToken) {
                    const data = await (await getRequest(`user/${decodedToken.id}`)).json()
                    if (data.data) setUser(data.data)
                }
            } catch (error) {
                console.log(error)
            }
        }
        getUser();

    }, [])

    useEffect(() => {
        if (user) {
            if ((user.username && user.password) && (user.dob && user.gender)) {
                setOnlyVerify(true)
            } else setOnlyVerify(false)
        } 

        const isExp = isTokenExp(activeToken)
        async function requestNewToken() {
            const newToken = await refreshToken(decodedToken?.id)
            setActiveToken(newToken)
        }
        if (isExp && decodedToken?.id) requestNewToken()
        
    }, [ user ])

    async function handleSubmit() {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}user/re-verify-account`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${activeToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ password: currentPassword })
            })
            const data = await res.json()
            if (res.ok) {
                toast.success(data.message)
                router.push('/user/edit-profile')
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Error submitting your password!')
        }
    }


    return (
        <>
            {
                onlyVerify ? 
                    verified ?
                        <div className="absolute bg-white max-w-96 rounded-xl z-[1] p-6 flex flex-col gap-4">
                            <div className="flex items-center gap-2">
                                <PiCheckCircleBold size={'1.2rem'} />
                                <h3 className="font-bold text-xl">Congrats!</h3>
                            </div>
                            <span className="text-black/60">Your account has been successfully verified!</span>
                        </div>
                    :
                        <div className="absolute bg-white max-w-96 rounded-xl z-[1] p-6 flex flex-col gap-4">
                            <h3 className="text-2xl font-bold">Verify New Email</h3>
                            <p className="text-black/70 mb-4">Insert your password to verify new email</p>
                            <Label className="font-semibold">Password</Label>
                            <Input
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                type="password"
                                placeholder="Insert your password to verify your account"
                            />
                            <LoadingButton onClick={handleSubmit} className="flex items-center gap-2 mt-8" type="submit" >Submit <PiArrowRight/></LoadingButton>
                        </div>
                :
                <SetupAccountDialog className="absolute" title={"Just a few more steps.."} form={<SetupUserAccountForm />}  />
            }
        </>
    )
};

