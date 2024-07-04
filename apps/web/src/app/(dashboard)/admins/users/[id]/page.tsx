import React from "react"
import DashboardWrapper from "../../_components/DashboardWrapper"
import Link from "next/link"
import { PiArrowLeft, PiGenderFemaleBold, PiGenderMaleBold, PiUserCircleThin } from "react-icons/pi"
import { getRequest } from "@/lib/fetchRequests"
import Image from "next/image"
import ActiveIndicator from "@/components/sidebar/ActiveIndicator"

export default async function Page({ params }: { params: { id: string } }) {

    // const res = await (await getRequest(`/user/${params.id}`)).json()
    // const user = res.data

    return (
        <DashboardWrapper>
            user slug
            {/* <Link href={`/admins/users`} className="mb-8 flex gap-2 items-center text-black/60 hover:text-black duration-200 w-fit">
                <PiArrowLeft className="cursor-pointer hover:fill-black" size={`1.2rem`} />
                Back to user page
            </Link>
            <div className=" h-full flex flex-col gap-20">
                <div className="flex flex-col gap-16 justify-between p-4 gradient rounded-lg border-2">
                    <div className=" flex justify-between gap-20">
                        <div className="flex items-center gap-10">
                            <div className="w-40 h-40 rounded-full overflow-hidden">
                                {
                                    user.imgUrl ? 
                                    <Image src={user.imgUrl} alt={""} />
                                    :
                                    <PiUserCircleThin className='w-full h-full bg-[#dadde2] fill-white' />
                                }
                            </div>

                            <div className="flex flex-col gap-1">
                                <span className="text-black/60 flex items-center gap-2">
                                    <ActiveIndicator isActive={user.accountActive} activeText={`User is verified`} nonActiveText={"User is not verified"} />
                                    Active User
                                </span>
                                <div className="flex gap-1">
                                    <h3 className="font-bold text-3xl cursor-pointer">{user.username}</h3>
                                    {
                                        user.gender == 'MALE' ?
                                        <PiGenderMaleBold className="fill-blue-400" />
                                        :
                                        <PiGenderFemaleBold className="fill-pink-400" />
                                    }
                                </div>
                                <div>
                                    <p className="text-black/60">
                                        <span className="text-black font-semibold">User ID: </span>
                                        &nbsp;#{user.id}
                                    </p>
                                    <p className="text-black/60">
                                        <span className="text-black font-semibold">Email: </span>
                                        <span>&nbsp;{user.email}</span>
                                    </p>
                                    <p className="text-black/60">
                                        <span className="text-black font-semibold">Date of Birth: </span>
                                        <span>&nbsp;{new Date(user.dob).toLocaleDateString('en-UK', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                    </p>
                                    <p className="text-black/60">
                                        <span className="text-black font-semibold">Registered at: </span>
                                        &nbsp; { new Date(user.createdAt).toLocaleDateString() }
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full h-72 border-2 border-red-300">Table</div>

            </div> */}
        </DashboardWrapper>
    )
};

