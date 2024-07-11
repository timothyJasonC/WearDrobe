import * as React from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel/carousel"
import { Badge } from "@/components/ui/badge"
import { PiHeart  } from "react-icons/pi";
import { formatToIDR } from "@/lib/utils";
import Image from "next/image";
import { IProduct } from "@/constants";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";


export default function BestSeller({ all, headerText, totalCol, data }: { all: boolean, headerText: string, totalCol?: "sm:basis-1/2" | "sm:basis-1/3", data: IProduct[]|[] }) {

    const router = useRouter();

    return (
        <div className="flex flex-col items-center sm:items-start">
            <div className="lg:py-4 sm:px-0 duration-200 flex items-center justify-between w-full">
                <h2 className="mb-2 text-lg font-bold text-center sm:text-start">{ headerText }</h2>
                <span className="text-black/40 text-sm md:hidden max-sm:hidden">scroll right</span>
            </div>

            <Carousel opts={{ align: "start", }} className="max-w-72 sm:max-w-[40rem] lg:max-w-[50rem] xl:max-w-[65rem] ">
                <CarouselContent className="">
                    {
                        data.length > 0 ?
                        data.map((item, idx) => {
                            return <CarouselItem onClick={() => router.push(`products/${item.slug}`) } key={idx} className={` ${ totalCol ? totalCol: 'sm:basis-1/2 lg:basis-1/3' } flex flex-col items-stretch`}>
                                <div className="cursor-pointer relative w-full">
                                    <Image
                                        priority
                                        width={350} height={100}
                                        className={`rounded-lg object-cover h-[300px]`} src={item.thumbnailURL} alt="" 
                                    />
                                </div>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="font-semibold">{ item.name }</p>
                                        <p className="font-light">{ formatToIDR(item.price) }</p>
                                    </div>

                                    <div className="cursor-pointer"><PiHeart size={`24px`} /></div>
                                </div>
                            </CarouselItem>
                        })
                        :
                        <div className="flex gap-4">
                            <Skeleton className="h-[400px] w-[400px] rounded-xl" />
                            <Skeleton className="h-[400px] w-[400px] rounded-xl" />
                            <Skeleton className="h-[400px] w-[400px] rounded-xl" />
                        </div>
                    }
                </CarouselContent>
                <div className="hidden md:block max-sm:block">
                    <CarouselNext />
                    <CarouselPrevious />
                </div>
            </Carousel>
        </div>
  )
}
