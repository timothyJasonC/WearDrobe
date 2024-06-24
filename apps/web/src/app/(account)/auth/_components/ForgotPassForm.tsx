"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form, FormControl, FormDescription,
  FormField, FormItem,
  FormLabel, FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { PiEnvelopeSimple, PiX } from "react-icons/pi"
import { postRequest } from "@/lib/fetchRequests"
import { toast } from "sonner"
import { useState } from "react"
import { LoadingButton } from "@/components/ui/loading-button"
import { closeDialogCleanForm } from "@/lib/utils"

const formSchema = z.object({
  email: z.string().email()
})

export function ForgotPassForm() {
    const [ isLoading, setIsLoading ] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { email: "" }
    })
    
    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true)
        try {
            const res = await postRequest(values, '/account/request-forgot-pass')
            setTimeout(() => {
                if (!res) toast("Please wait while we're processing your request")
            }, 5000);
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
                toast.warning("Password reset is unavailable for your account", { description: 'please login using Google or Facebook' })
            } 
            closeDialogCleanForm('forgot-password-dialog', form)

        } catch (error) {
            setIsLoading(false)
            toast.error("Oops, something went wrong", { description: 'server might be down' })
        }
    }

  return (
    <div id="forgot-password-dialog" className="absolute top-0 bottom-0 left-0 right-0 justify-center items-center bg-black/30 hidden">
        <div className="max-w-96 p-6 rounded-xl bg-white">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-2xl font-bold text-black flex items-center justify-between">
                                Forgot password?
                                <PiX onClick={() => {
                                    closeDialogCleanForm('forgot-password-dialog', form)
                                }} className="cursor-pointer" size={'1rem'} />
                            </FormLabel>
                            <FormDescription>
                                    Fear not. We'll email you instructions to reset your password.
                            </FormDescription>
                            <FormControl>
                                <Input className="focus-visible:ring-black/0 focus-visible:border-black/60 duration-200" placeholder="@example: brucewayne@gmail.com" {...field} />
                            </FormControl>
                                
                            <FormMessage />
                        </FormItem>
                    )}
                    />
                    {
                        isLoading ? 
                        <LoadingButton loading type="submit" className="flex gap-2">Reset Password<PiEnvelopeSimple size={'1.1rem'} /></LoadingButton>
                        :
                        <Button type="submit" className="flex gap-2">Reset Password<PiEnvelopeSimple size={'1.1rem'} /></Button>
                    }
                </form>
            </Form>
        </div>
    </div>
  )
}
