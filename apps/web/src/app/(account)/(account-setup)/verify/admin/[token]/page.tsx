'use client'
import React, { useEffect, useState } from "react"
import { SetupAccountDialog } from "../../_components/SetupAccountDialog";
import SetupAdminAccountForm from "../_components/SetupAdminAccountForm";
import { PiCheckCircleBold } from "react-icons/pi";
import { Spinner } from "@/components/ui/spinner";
import { useParams } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { getRequest, getRequestToken, refreshToken } from "@/lib/fetchRequests";
import { isTokenExp } from "@/lib/utils";
import { toast } from "sonner";
import { IAdmin } from "@/app/(dashboard)/admins/admins/_components/columns";

export default function Page() {
    const params = useParams()
    const [ onlyVerify, setOnlyVerify ] = useState(true);
    const [ verified, setVerified ] = useState(false);
    const [ activeToken, setActiveToken ] = useState<string>('')
    const [ decodedToken, setDecodedToken ] = useState<{ exp: number, iat: number, id: string, role: string } | undefined>()
    const [ admin, setAdmin ] = useState<IAdmin | null>();

    useEffect(() => {
        const token = params.token.toString();
        const decodedToken : undefined | { exp: number, iat: number, id: string, role: string } = jwtDecode(token);
        if (token && decodedToken) setActiveToken(token); setDecodedToken(decodedToken)

        async function getAdmin() {
            try {
                if (decodedToken) {
                    const data = await (await getRequest(`admin/${decodedToken.id}`)).json()
                    if (data.data) setAdmin(data.data)
                }
            } catch (error) {
                console.log(error)
            }
        }
        getAdmin();

    }, [])

    useEffect(() => {
        if (admin) {
            if ((admin.fullName && admin.password) && (admin.dob && admin.gender)) {
                setOnlyVerify(true)
            } else setOnlyVerify(false)
        } 

        const isExp = isTokenExp(activeToken)
        async function requestNewToken() {
            const newToken = await refreshToken(decodedToken?.id)
            setActiveToken(newToken)
        }
        if (isExp && decodedToken?.id) requestNewToken()
        
    }, [ admin ])

    useEffect(() => {
        async function verifyAccount() {
            try {
                const res = await getRequestToken('admin/re-verify-account', activeToken)
                const data = await res.json();
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
                            <span className="text-black/60">We&apos;re verifying your account</span>
                        </div>
                :
                <SetupAccountDialog className="absolute" title={"Welcome new candidates!"} form={<SetupAdminAccountForm />} optionalText="Please fill in the data below to verify your account." />
            }
        </>
    )
};

