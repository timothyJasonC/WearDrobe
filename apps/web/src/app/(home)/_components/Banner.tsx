import React from "react"
import { Button } from "../../../components/ui/button"

export default function Banner() {
    const imgUrl = 'https://images.pexels.com/photos/3568518/pexels-photo-3568518.jpeg'
    return (
        <div className="overflow-hidden sm:rounded-xl lg:h-[40rem] relative">
            {/* max-w-[40rem] lg:max-w-[50rem] xl:max-w-[65rem]  */}
            <div className="flex items-center">
                <img className="duration-200 object-cover
                    w-full max-w-[40rem] lg:max-w-[50rem] xl:max-w-[65rem] xl:-translate-y-80
                " 
                src={imgUrl} alt="" />
                <div className="w-full h-full bg-black/40 absolute top-0 left-0"></div>
                
            </div>
            <div className="z-[1] absolute bottom-10 flex flex-col items-center w-full gap-6 lg:gap-8">
                <p className="text-yellow-400 font-semibold italic lg:text-3xl text-2xl h-5 flex items-center">Casual Men's Wear</p>
                <Button className="px-8 bg-white text-black hover:text-white font-light">Check Collection</Button>
            </div>
        </div>
    )
};

