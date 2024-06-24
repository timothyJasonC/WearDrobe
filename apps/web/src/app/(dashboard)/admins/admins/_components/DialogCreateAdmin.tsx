'use client'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { PiArrowUpRight, PiPlusBold } from "react-icons/pi"
import * as z from 'zod'
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { LoadingButton } from "@/components/ui/loading-button"
import { useState } from "react"
import { toast } from "sonner"
import { postRequest } from "@/lib/fetchRequests"

export function DialogCreateAdmin() {
    const [ isLoading, setIsLoading ] = useState(false);

    const regFormSchema = z.object({
        email: z.string().email()
    })

    const registerForm = useForm<z.infer<typeof regFormSchema>>({
        resolver: zodResolver(regFormSchema),// if the input value changes, zodResolver will revalidate the value
        defaultValues: { email: "" }
    })

    async function handleRegister(values: z.infer<typeof regFormSchema>) {
        setIsLoading(true)
        const { email } = registerForm.getValues()
        try {
            const res = await postRequest({ email: email }, '/admin')
            if (res) setIsLoading(false)
            if (res.ok) {
                toast.success("Email is successfully registered!", { description: "Please inform the new candidate to check their account" })
            } else if (res.status == 409) {
                toast.warning("Email has been registered!")
                if (!(await res.json()).data.accountActive) setTimeout(() => { toast("Please inform the new candidate to check their email") }, 2000);
            } else {
                toast.warning("Registration error.", {
                    description: "Please try again later."
                })
            }
            registerForm.reset()

        } catch(error) {
            setIsLoading(false)
            toast.warning("Something went wrong", { description: "server might be down" })
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <LoadingButton variant="outline" className="flex gap-2"><PiPlusBold />Register New Warehouse Admin</LoadingButton>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                <DialogTitle>Register New Warehouse Admin</DialogTitle>
                <DialogDescription>
                    Send an invitation email to a new warehouse admin to setup and verify their account.
                </DialogDescription>
                </DialogHeader>
                    <Form {...registerForm}>
                        <form className="flex flex-col gap-10" onSubmit={registerForm.handleSubmit(handleRegister)}>
                            <FormField
                                control={registerForm.control}
                                name="email"
                                render={({ field }) => {
                                    return (
                                        <FormItem>
                                            <FormLabel className="text-black">Email</FormLabel>
                                            <FormControl>
                                                <Input 
                                                    placeholder="@example: barryallen@gmail.com"
                                                    type="email"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )
                                }}
                            />
                            {
                                isLoading ? 
                                <div className="flex justify-end">
                                    <LoadingButton loading className="px-10 flex gap-2 w-fit" type="submit">Send Invitation
                                        <PiArrowUpRight />
                                    </LoadingButton>
                                </div>
                                :
                                <div className="flex justify-end">
                                    <LoadingButton className="px-10 flex gap-2 w-fit" type="submit">Send Invitation
                                        <PiArrowUpRight />
                                    </LoadingButton>
                                </div>
                            }
                        </form>
                    </Form>
            </DialogContent>
        </Dialog>
    )
}
