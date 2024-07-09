import React from "react"
import Image from "next/image"

export default function DashboardHeaderPhoto({ imgUrl, altText, imgClassName, objectPosition, precisePos }: { imgUrl: string, altText?: string, imgClassName?: string, objectPosition?: "object-top" | "object-center" | "object-bottom", precisePos?: string }) {
    return (
        <div className="absolute top-0 left-0 z-[0]">
            <Image
                priority width={2000} height={500}
                className={`w-screen object-cover ${ objectPosition } h-[25vh] ${ imgClassName }`}
                src={imgUrl} alt={altText && altText ? altText : ''} 
                style={{objectPosition: precisePos ? precisePos : ''}}
            />
        </div>
    )
};

