'use client'
import React from "react"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
  } from "@/components/ui/carousel/carousel"
import Autoplay from "embla-carousel-autoplay"
import Image from "next/image";


export default function HeroCarousel() {

    const dummyDataCarousel = [
        {
            img: 'https://images.unsplash.com/photo-1523199455310-87b16c0eed11?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
        {
            img: 'https://images.unsplash.com/photo-1565084888279-aca607ecce0c?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
        {
            img: 'https://images.unsplash.com/photo-1565084888279-aca607ecce0c?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
        {
            img: 'https://images.unsplash.com/photo-1565084888279-aca607ecce0c?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
        {
            img: 'https://images.unsplash.com/photo-1523199455310-87b16c0eed11?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
    ];

    const plugin = React.useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true })
    )

    return (
        
        <div className="
            flex justify-center items-center flex-col
            max-w-[40rem] lg:max-w-[50rem] xl:max-w-[65rem]
            duration-200 sm:rounded-xl overflow-hidden gap-4
        ">
            <Carousel 
                plugins={[plugin.current]} className="cursor-grab"
                onMouseEnter={plugin.current.stop} onMouseLeave={plugin.current.isPlaying}
            >
                <CarouselContent >
                    {
                        dummyDataCarousel.map((item, idx) => {
                            return <CarouselItem key={idx} className="basis-3/4">
                                <div className="sm:rounded-xl overflow-hidden duration-200 lg:max-h-[38rem] relative">
                                    <Image priority width={800} height={608} src={item.img} alt="" />
                                    { idx == 0 && 
                                        <div className="text-white absolute font-thin lg:text-2xl text-lg lg:bottom-4 lg:left-4 bottom-2 left-2 z-[1]">
                                            Everyday. Wear. Confident.
                                        </div>
                                    }
                                    <div className="bg-gradient-to-tr from-black/60 from-20% to-50% w-full h-full absolute bottom-0 left-0"></div>
                                </div>
                            </CarouselItem>
                        })
                    }
                </CarouselContent>
            </Carousel>
        </div>
    )
};

