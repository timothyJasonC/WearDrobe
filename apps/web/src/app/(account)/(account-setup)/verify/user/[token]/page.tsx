'use client'
import React, { useEffect, useState } from "react"
import { SetupAccountDialog } from "../../_components/SetupAccountDialog";
import SetupUserAccountForm from "../_components/SetupUserAccountForm";
import { getUserServerSide, isTokenExp } from "@/lib/utils";
import { PiCheckBold, PiCheckCircleBold } from "react-icons/pi";
import { getRequest, getRequestToken, postRequestToken, refreshToken } from "@/lib/fetchRequests";
import { Spinner } from "@/components/ui/spinner";
import { useParams } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { IUser } from "@/app/(home)/(user-dashboard)/user/edit-profile/_components/EditProfileForm";
import { toast } from "sonner";

export default function Page() {
    const params = useParams()
    const [ onlyVerify, setOnlyVerify ] = useState(true);
    const [ verified, setVerified ] = useState(false);
    const [ decodedToken, setDecodedToken ] = useState<{ exp: number, iat: number, id: string, role: string } | undefined>()
    const [ activeToken, setActiveToken ] = useState<string>('')
    const [ user, setUser ] = useState<IUser>();

    useEffect(() => {
        const token = params.token.toString();
        const decodedToken : undefined | { exp: number, iat: number, id: string, role: string } = jwtDecode(token);
        if (token && decodedToken) setActiveToken(token); setDecodedToken(decodedToken)

        async function getUser() {
            try {
                if (decodedToken) {
                    const data = await (await getRequest(`/user/${decodedToken.id}`)).json()
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

    useEffect(() => {
        async function verifyAccount() {
            try {
                const res = await getRequestToken('/user/re-verify-account', activeToken)
                if (res.ok) {
                    setVerified(true)
                } 
            } catch (error) {
                if (typeof error == 'string') {
                    toast.error(error)
                } else console.log(error)
            }
        }
        verifyAccount();

    }, [ activeToken ])
    
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
                            <div className="flex items-center gap-2">
                                <Spinner size={`small`} />
                                <h3 className="font-bold text-xl">Please wait..</h3>
                            </div>
                            <span className="text-black/60">We're verifying your account</span>
                        </div>
                :
                <SetupAccountDialog className="absolute" title={"Just a few more steps.."} form={<SetupUserAccountForm />}  />
            }
        </>
    )
};

