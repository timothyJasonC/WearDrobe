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


export default function BestSeller({ all, headerText, totalCol }: { all: boolean, headerText: string, totalCol?: string }) {

    const dummyData = [
        {
            title: 'Item 1',
            img: 'https://images.unsplash.com/photo-1523199455310-87b16c0eed11?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            tag: 'Men',
            price: 10000
        },
        {
            title: 'Item 2',
            img: 'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            tag: 'Men',
            price: 10000
        },
        {
            title: 'Item 3',
            img: 'https://images.unsplash.com/photo-1565084888279-aca607ecce0c?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            tag: 'Men',
            price: 10000
        },
        {
            title: 'Item 4',
            img: 'https://images.unsplash.com/photo-1555836721-6fec17bd948a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            tag: 'Men',
            price: 10000
        },
        {
            title: 'Item 5',
            img: 'https://images.unsplash.com/photo-1584093091778-e7f4e76e8063?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            tag: 'Men',
            price: 10000
        },
    ]

    const dummyBadgeData = [
        'Tops', 'Bottoms', 'Accessories'
    ]

    return (
        <div className="flex flex-col items-center sm:items-start">
            <div className="lg:py-4 sm:px-0 duration-200 mb-6">
                <h2 className="mb-2 text-lg font-bold text-center sm:text-start">{ headerText }</h2>
                { all && 
                <div className="flex lg:gap-4 overflow-scroll flex-wrap gap-2 justify-center">
                    {
                        dummyBadgeData.map((badge, idx) => {
                            return <Badge key={idx} variant="outline" className="px-7 py-2 font-normal text-sm text-black/80 hover:cursor-pointer">{ badge }</Badge>
                        })
                    }
                </div>
                }
            </div>

            <Carousel opts={{ align: "start", }} className="max-w-72 sm:max-w-[40rem] lg:max-w-[50rem] xl:max-w-[65rem] ">
                <CarouselContent className="">
                    {
                        dummyData.map((item, idx) => {
                            return <CarouselItem key={idx} className={` ${ totalCol ? totalCol: 'sm:basis-1/2 lg:basis-1/3' } flex flex-col items-stretch`}>
                                <div className="cursor-pointer relative w-full">
                                    <Image
                                        priority
                                        width={350} height={100}
                                        className="rounded-lg w-full" src={item.img} alt="" 
                                    />
                                </div>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="font-semibold">{ item.title }</p>
                                        <p className="font-light">{ formatToIDR(item.price) }</p>
                                    </div>

                                    <div className="cursor-pointer"><PiHeart size={`24px`} /></div>
                                </div>
                            </CarouselItem>
                        })
                    }
                </CarouselContent>
                <div className="hidden md:block max-sm:block max-[425px]:hidden">
                    <CarouselNext />
                    <CarouselPrevious />
                </div>
            </Carousel>
        </div>
  )
}
