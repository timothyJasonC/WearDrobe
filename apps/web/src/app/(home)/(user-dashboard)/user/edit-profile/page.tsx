'use client'
import React from "react"
import Wrapper from "../../_components/Wrapper"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { DatePicker } from "@/app/(account)/verify/_components/DatePicker"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { LoadingButton } from "@/components/ui/loading-button"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { PiArrowRight, PiEnvelopeSimple } from "react-icons/pi"
import { Separator } from "@/components/ui/separator"
import { SelectGroup, SelectLabel } from "@/components/ui/select"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"

export default function Page() {

    const isLoading = false

    const userProfileSchema = z.object({
        username: z.string().min(6, "username must at least contain 6 characters"),
        email: z.string().email(),
        dob: z.date({ required_error: "A date of birth is required." }),
        gender: z.string({required_error: "Gender is required"})
    })

    const userProfileForm = useForm<z.infer<typeof userProfileSchema>>({
        resolver: zodResolver(userProfileSchema),
        // defaultValues: { username: '', email: '' }
    })

    async function handleUserProfile() {
        // setIsLoading(true)
        // const { username, password, confirmPassword, dob, gender } = setupAccountForm.getValues()
        
        // try {

        //     if (password == confirmPassword && activeToken) {
        //         const userData = {
        //             username: username, password: password, dob: dob, gender: gender 
        //         }
        //         const res = await postRequestToken(userData, '/user/setup-verify-user', activeToken)
    
        //         if (res.ok) {
        //             setIsLoading(false)
        //             toast.success("Account has been successfully setup!")
        //             setTimeout(() => { toast("Your account has been verified!", { description: 'redirecting you to login page..' }) }, 3000)
        //             setTimeout(() => { router.push('/auth') }, 6000)
        //         } else if (res.status == 409) {
        //             setIsLoading(false)
        //             toast.error("Username has been taken")
        //         } else if (res.status == 404) {
        //             setIsLoading(false)
        //             toast.error("User not found")
        //         } else {
        //             setIsLoading(false)
        //             toast.error("Verification error", { description: "Please try again later" })
        //         }
        //     } else {
        //         setIsLoading(false)
        //         toast.error("Password doesn't match")
        //     }

        // } catch (error) {
        //     toast.warning("Something went wrong", { description: "server might be down" })
        // }
    }

    return (
        <Wrapper title={"Edit Profile"} className={"flex justify-between flex-col h-96"} >

            <Form {...userProfileForm} >
                <form className="h-full flex flex-col justify-between" onSubmit={userProfileForm.handleSubmit(handleUserProfile)}>
                    <div className="flex flex-col gap-4">
                        <FormField
                            control={userProfileForm.control}
                            name="username"
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <div className="flex items-center justify-between">
                                            <FormLabel className="text-black">Username</FormLabel>
                                            <FormControl>
                                                <Input 
                                                    className="max-w-[30rem]"
                                                    style={{marginTop: '0'}}
                                                    placeholder="@example: batman666"
                                                    type="text"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </div>
                                        <FormMessage/>
                                    </FormItem>
                                )
                            }}
                        />
                        <FormField
                            control={userProfileForm.control}
                            name="email"
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <div className="flex items-center justify-between">
                                            <FormLabel className="text-black">Email</FormLabel>
                                            <FormControl>
                                                <Input 
                                                    className="max-w-[30rem]"
                                                    style={{marginTop: '0'}}
                                                    placeholder="@example: batman666"
                                                    type="email"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </div>
                                        <FormMessage/>
                                    </FormItem>
                                )
                            }}
                        />
                        <FormField
                            control={userProfileForm.control}
                            name="gender"
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <div className="flex items-center justify-between">
                                            <FormLabel className="text-black">Gender</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className="max-w-[30rem]" style={{marginTop: '0'}}>
                                                        <SelectValue placeholder="Select your gender" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent >
                                                    <SelectGroup>
                                                        <SelectItem value="MALE">Male</SelectItem>
                                                        <SelectItem value="FEMALE">Female</SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <FormMessage/>
                                    </FormItem>
                                )
                            }}
                        />
                        <FormField
                            control={userProfileForm.control}
                            name="dob"
                            render={({ field }) => {
                                return (
                                    <FormItem className="flex flex-col">
                                        <div className="flex items-center justify-between">
                                            <FormLabel className="text-black">Date of birth</FormLabel>
                                            <DatePicker className="max-w-[30rem] min-w-[20rem]" field={field} />
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )
                            }}
                        />
                    </div>
                    
                    <div className="flex justify-end">
                        
                        <AlertDialog>
                            <AlertDialogTrigger className="bg-black px-10 py-2 text-white rounded-lg hover:bg-black/80 font-medium flex items-center gap-2">Save Change<PiEnvelopeSimple size={`1rem`}/></AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you sure you want to update your personal information?</AlertDialogTitle>
                                    {/* <AlertDialogDescription>
                                        An email will be sent shortly from WearDrobe team to your email address with instructions on how to reset your password.
                                    </AlertDialogDescription> */}
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    {
                                        isLoading ? 
                                        <LoadingButton loading={isLoading ? true: false} className="px-10 flex items-center gap-2 w-fit" type="submit">Save Change</LoadingButton>
                                        :
                                        <Button className="px-10 flex items-center gap-2 w-fit" type="submit">Save Change</Button>
                                    }
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </form>
            </Form>
        </Wrapper>
    )
};

