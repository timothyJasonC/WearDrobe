'use client'
import React, { useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { DatePicker } from "@/app/(account)/(account-setup)/verify/_components/DatePicker"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { PiFloppyDiskBold, PiX } from "react-icons/pi"
import { SelectGroup } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { LoadingButton } from "@/components/ui/loading-button"
import { toast } from "sonner"
import { patchRequest } from "@/lib/fetchRequests"
import { IAdmin } from "../../admins/_components/columns"
import { Gender } from "@/app/(home)/(user-dashboard)/user/edit-profile/_components/EditProfileForm"

export default function EditProfileAdminForm({ admin } : { admin: IAdmin | null }) {
    const [ isLoading, setIsLoading ] = useState(false)
    const [ isDisabled, setIsDisabled ] = useState(true)
    const [ openDialog, setOpenDialog ] = useState(false)
    const [changedDataState, setChangedDataState] = useState<string[]>([]); 

    const adminProfileSchema = z.object({
        fullName: z.string().trim().min(6, "Full Name must at least contain 6 characters").max(20, "maximum 20 characters"),
        email: z.string().email(),
        dob: z.date({ required_error: "A date of birth is required." }).optional(),
        gender: z.enum([Gender.MALE, Gender.FEMALE], {required_error: "Gender is required"}).optional(),
    });
    
    const adminProfileForm = useForm<z.infer<typeof adminProfileSchema>>({
        resolver: zodResolver(adminProfileSchema),
        defaultValues: {
            fullName: admin?.fullName ?? '', 
            email: admin?.email ?? '', 
            dob: admin?.dob ? new Date(admin?.dob) : new Date(), 
            gender: admin?.gender ?? (Gender.FEMALE || Gender.MALE)
        }
    });

    async function handleUserProfile(values: z.infer<typeof adminProfileSchema>) {
        if (admin) {
            setIsLoading(true)
            const currentData = { fullName: admin.fullName, email: admin.email, gender: admin.gender, dob: admin.dob }
            const newData = { fullName: values.fullName, email: values.email, gender: values.gender, dob: values.dob instanceof Date ? values.dob.toISOString() : values.dob }
            const keys: (keyof typeof currentData)[] = ["fullName", "email", "gender", "dob"]
            type UserDataKeys = "fullName" | "email" | "dob" | "gender";
            const changedData: Partial<Record<UserDataKeys, any>> = {};
            keys.forEach(key => {
                if (currentData[key] !== newData[key]) {
                    changedData[key] = newData[key];
                }
            });
    
            try {
                if ((changedData.dob || changedData.fullName) || (changedData.gender || changedData.email)) {
                    const res = await patchRequest(changedData, `admin/personal/${admin.id}`)
                    const data = await res.json()
                    if (res.ok) {
                        toast.success(data.message)
                        if (changedData.email) {
                            setTimeout(() => {
                                toast("We've sent a verification email to your new email address", { description: "Please check your inbox to re-verify your account." })
                            }, 2500);
                        }
                    } else {
                        toast.error(data.message)
                    }
                } else {
                    toast.warning("You haven't made any change")
                }
            } catch (error) {
                toast.warning("Something went wrong", { description: "server might be down" })
            } finally {
                setIsLoading(false)
            }
        } 
    }

    return (
        <div className="flex justify-between flex-col lg:p-4 min-w-full">
            <Form {...adminProfileForm} >
                <form className="h-full flex flex-col lg:justify-between gap-10" onSubmit={adminProfileForm.handleSubmit(handleUserProfile)}>
                    <div className="flex flex-col gap-4">
                        <FormField
                            control={adminProfileForm.control}
                            name="fullName"
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <div className="input-layout-admin-profile">
                                            <FormLabel className="text-black">Username</FormLabel>
                                            <FormControl>
                                                <Input
                                                    className="input-width-admin-profile"
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
                            control={adminProfileForm.control}
                            name="email"
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <div className="input-layout-admin-profile">
                                            <FormLabel className="text-black">Email</FormLabel>
                                            <FormControl>
                                                <Input 
                                                    className="input-width-admin-profile"
                                                    style={{marginTop: '0'}}
                                                    placeholder="@example: brucewayne@gmail.com"
                                                    type="email"
                                                    disabled={admin && !admin.password ? true : false}
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
                            control={adminProfileForm.control}
                            name="gender"
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <div className="input-layout-admin-profile">
                                            <FormLabel className="text-black">Gender</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className="input-width-admin-profile" style={{marginTop: '0'}}>
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
                            control={adminProfileForm.control}
                            name="dob"
                            render={({ field }) => {
                                return (
                                    <FormItem className="flex flex-col">
                                        <div className="input-layout-admin-profile">
                                            <FormLabel className="text-black">Date of birth</FormLabel>
                                            <DatePicker className="input-width-admin-profile w-full" field={field} />
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )
                            }}
                        />
                    </div>

                    <span className="text-black/60 text-xs">*Changing your email will be required you to re-verify your account</span>
                    <div className="flex justify-end">
                        <LoadingButton type="submit" loading={isLoading} className="px-10 flex items-center gap-2 w-fit max-sm:w-full">Save Change<PiFloppyDiskBold size={`1rem`}/></LoadingButton>
                    </div>
                    
                </form>
            </Form>
        </div>
    )
};

