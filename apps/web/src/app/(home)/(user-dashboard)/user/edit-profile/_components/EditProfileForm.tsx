'use client'
import React, { useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { DatePicker } from "@/app/(account)/(account-setup)/verify/_components/DatePicker"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { PiFloppyDiskBold } from "react-icons/pi"
import { Separator } from "@/components/ui/separator"
import { SelectGroup, SelectLabel } from "@/components/ui/select"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import { LoadingButton } from "@/components/ui/loading-button"
import { StaticImport } from "next/dist/shared/lib/get-img-props"
import { InputPhotoProfile } from "./InputPhotoProfile"

export enum Gender {
    MALE = 'MALE',
    FEMALE = 'FEMALE'
}

export interface IUser {
    id: string;
    accountActive: boolean;
    username?: string | null | undefined;
    email: string;
    password?: string | null | undefined;
    gender?: Gender | null | undefined;
    dob?: Date | null | undefined;
    createdAt: Date;
    imgUrl?: string | null | undefined;
}

export default function EditProfileForm({ user } : { user: IUser }) {
    const [ isLoading, setIsLoading ] = useState()

    const userProfileSchema = z.object({
        username: z.string().optional(),
        email: z.string().optional(),
        dob: z.date().optional(),
        gender: z.enum([Gender.MALE, Gender.FEMALE]).optional(),
    });
    
    const userProfileForm = useForm<z.infer<typeof userProfileSchema>>({
        resolver: zodResolver(userProfileSchema),
        defaultValues: {
            username: user.username ?? undefined, email: user.email ?? undefined, dob: user.dob ?? undefined, gender: user.gender ?? undefined
        }
    });

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
        <div className="flex justify-between flex-col h-96 max-lg:h-full">
            <Form {...userProfileForm} >
                <form className="h-full flex flex-col lg:justify-between gap-10" onSubmit={userProfileForm.handleSubmit(handleUserProfile)}>
                    <div className="flex flex-col gap-4">
                        <FormField
                            control={userProfileForm.control}
                            name="username"
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <div className="input-layout-user-profile">
                                            <FormLabel className="text-black">Username</FormLabel>
                                            <FormControl>
                                                <Input 
                                                    className="input-width-user-profile"
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
                                        <div className="input-layout-user-profile">
                                            <FormLabel className="text-black">Email</FormLabel>
                                            <FormControl>
                                                <Input 
                                                    className="input-width-user-profile"
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
                                        <div className="input-layout-user-profile">
                                            <FormLabel className="text-black">Gender</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className="input-width-user-profile" style={{marginTop: '0'}}>
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
                                        <div className="input-layout-user-profile">
                                            <FormLabel className="text-black">Date of birth</FormLabel>
                                            <DatePicker className="input-width-user-profile" field={field} />
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )
                            }}
                        />
                    </div>
                    
                    <div className="flex sm:justify-end justify-center">
                        <AlertDialog>
                            <AlertDialogTrigger className="bg-black px-10 py-2 text-white rounded-lg hover:bg-black/80 font-medium flex items-center gap-2">Save Change<PiFloppyDiskBold size={`1rem`}/>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you sure you want to update your personal information?</AlertDialogTitle>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    {
                                        isLoading ? 
                                        <LoadingButton loading={isLoading ? true: false} className="px-10 flex items-center gap-2 w-fit" type="submit">Save Change</LoadingButton>
                                        :
                                        <LoadingButton className="px-10 flex items-center gap-2 w-fit" type="submit">Save Change</LoadingButton>
                                    }
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </form>
            </Form>
        </div>
    )
};

