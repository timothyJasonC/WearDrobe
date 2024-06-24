"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form, FormControl,
  FormField, FormItem,
  FormLabel, FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { PiArrowRight, PiEye, PiEyeClosed } from "react-icons/pi"
import { patchRequest } from "@/lib/fetchRequests"
import { toast } from "sonner"
import { useEffect, useState } from "react"
import { LoadingButton } from "@/components/ui/loading-button"
import { isTokenExp } from "@/lib/utils"
import { useParams, useRouter } from "next/navigation"
import { jwtDecode } from "jwt-decode"

const formSchema = z.object({
    password: z.string().min(6, 'your password must be at least 6 characters'),
    confirmPassword: z.string().min(6, 'your password must be at least 6 characters')
})

export function NewPassForm() {
    const [ isLoading, setIsLoading ] = useState(false);
    const [ currentToken, setCurrentToken ] = useState('');
    const [ passwordHidden, setPasswordHidden ] = useState(true);
    const [ confirmPasswordHidden, setConfirmPasswordHidden ] = useState(true);
    const params = useParams();
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { password: "", confirmPassword: "" }
    })

    useEffect(() => {
        const token = params.token.toString();
        setCurrentToken(token)
    }, [])
    
    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true)
        try {
            const isExp = isTokenExp(currentToken)
            const decodedToken = jwtDecode(currentToken)
            if (isExp) {
                setIsLoading(false)
                toast.error('Token is expired or invalid', { description: 'please request the new one on login page or account page'})
            } else {
                let accountData : { id: string, password: string, token: string } = { id: '', password: '', token: '' }
                const { id } : any = decodedToken;
                if (values.password === values.confirmPassword) {
                    accountData = { id: id, password: values.password, token: currentToken }

                    const res = await patchRequest(accountData, '/account/update-pass')
                    if (res) setIsLoading(false)
                    if (res.ok) {
                        form.reset()
                        toast.success("Password has successfully updated")
                        setTimeout(() => toast('Redirecting you to login page...'), 2000);
                        setTimeout(() => router.push('/auth'), 4000);
                    } else if (res.status == 404) {
                        toast.error("The token is invalid") 
                        setTimeout(() => toast("You may have just changed your password", { description: 'you can only reset your password once per request' }), 2000);
                        setTimeout(() => toast("Please make a new request if necessary"), 5000);
                    }
                } else {
                    setIsLoading(false)
                    toast.error("Password doesn't match") 
                }
            }
        } catch (error) {
            setIsLoading(false)
            toast.error("Oops, server might be down", { description: 'or token invalid' })
        }
    }

    return (
        <div className="max-w-96 p-6 rounded-xl bg-white">
            <div className="mb-6">
                <h3 className="text-2xl font-bold">Create Your New Password</h3>
                <p className="text-black/40">Enter and confirm your new password.</p>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-semibold text-black">
                                    New Password
                                </FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input 
                                        type={ passwordHidden? "password" : "string" }
                                        className="focus-visible:ring-black/0 focus-visible:border-black/60 duration-200" placeholder="Type your new password here" {...field} />
                                        {
                                            passwordHidden? 
                                            <PiEyeClosed onClick={() => {
                                                setPasswordHidden(!passwordHidden)
                                            }} className="cursor-pointer top-0 bottom-0 m-auto right-2 absolute" size={'1.1rem'} />
                                            :
                                            <PiEye onClick={() => {
                                                setPasswordHidden(!passwordHidden)
                                            }} className="cursor-pointer top-0 bottom-0 m-auto right-2 absolute" size={'1.1rem'} />
                                        }
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-semibold text-black">
                                    Confirm Password
                                </FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input 
                                        type={ confirmPasswordHidden? "password" : "string" }
                                        className="focus-visible:ring-black/0 focus-visible:border-black/60 duration-200" placeholder="Type your new password here" {...field} />
                                        {
                                            confirmPasswordHidden? 
                                            <PiEyeClosed onClick={() => {
                                                setConfirmPasswordHidden(!confirmPasswordHidden)
                                            }} className="cursor-pointer top-0 bottom-0 m-auto right-2 absolute" size={'1.1rem'} />
                                            :
                                            <PiEye onClick={() => {
                                                setConfirmPasswordHidden(!confirmPasswordHidden)
                                            }} className="cursor-pointer top-0 bottom-0 m-auto right-2 absolute" size={'1.1rem'} />
                                        }
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <LoadingButton loading={isLoading ? true: false} type="submit" className="flex gap-2">Save New Password<PiArrowRight /></LoadingButton>
                </form>
            </Form>
        </div>
    )
}
