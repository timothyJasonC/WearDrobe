'use client'
import React, { useState } from 'react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { postRequest } from '@/lib/fetchRequests';
import { getUserClientSide } from '@/lib/utils';
import { LoadingButton } from '@/components/ui/loading-button';
import { toast } from "sonner"

export default function AlertDialogResetPass({ confirmText, cancelText }: { confirmText: string, cancelText: string }) {
    const [ openDialog, setOpenDialog ] = useState(false)
    const [ isLoading, setIsLoading ] = useState(false)

    async function handleResetPasswordRequest() {
        setIsLoading(true)
        const user = await getUserClientSide();
        try {
            const res = await postRequest({ email: user.email }, 'account/request-reset-pass')
            if (res) setIsLoading(false)
            if (res.status == 202) {
                toast.warning("We've already sent you an email before", { description: 'please check your email or spam' })
            } else if (res.ok) {
                toast.success("We’ve sent you an email to reset your password", { description: "if it's not there, look into your spam folder" })
            } else if (res.status == 404) {
                toast.warning("You haven't setup your account", { description: 'please check your email.' })
            } else if (res.status == 400) {
                toast.error("Email is not registered", { description: 'please sign-up first' })
            } else if (res.status == 401) {
                toast.warning("Password reset is unavailable for your account", { description: 'since your account is linked to Google or Facebook.' })
            } 
        } catch (error) {
            toast.error('Server might be down')
        }
    }

    return (
        <>
            <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
                <AlertDialogTrigger className="bg-black px-10 py-2 text-white rounded-md hover:bg-black/80 font-light">Reset Password</AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure you want to reset your password?</AlertDialogTitle>
                        <AlertDialogDescription>
                            An email will be sent shortly from WearDrobe team to your email address with instructions on how to reset your password.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel >{ cancelText }</AlertDialogCancel>
                        <LoadingButton loading={isLoading} onClick={handleResetPasswordRequest} >{ confirmText }</LoadingButton>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
