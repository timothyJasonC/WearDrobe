import React from "react"
import Marquee from "react-fast-marquee";
import Image from "next/image";

export default function MarqueeBackground() {

    const photos = [
        'https://images.unsplash.com/photo-1612217175157-e5d846b139d4?q=80&w=3125&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1519631128182-433895475ffe?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.pexels.com/photos/20655394/pexels-photo-20655394/free-photo-of-inverted-reflection-of-a-beautiful-woman-in-a-small-mirror.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.pexels.com/photos/5310890/pexels-photo-5310890.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.unsplash.com/photo-1540479859555-17af45c78602?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.pexels.com/photos/5026424/pexels-photo-5026424.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.pexels.com/photos/6784755/pexels-photo-6784755.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.unsplash.com/photo-1717381112342-bc9c43d2db93?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.pexels.com/photos/848618/pexels-photo-848618.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ]

    const photos2 = [
        'https://images.pexels.com/photos/6150432/pexels-photo-6150432.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.pexels.com/photos/3766217/pexels-photo-3766217.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.pexels.com/photos/2315309/pexels-photo-2315309.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.unsplash.com/photo-1565293064794-3d56024793db?q=80&w=2971&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.pexels.com/photos/19880681/pexels-photo-19880681/free-photo-of-man-in-headscarf-smoking-cigarette.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.pexels.com/photos/13634354/pexels-photo-13634354.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.pexels.com/photos/14711366/pexels-photo-14711366.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.unsplash.com/photo-1534404483017-8743b4e935cd?q=80&w=3173&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1516624446358-a647044a8b57?q=80&w=2972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.pexels.com/photos/3755706/pexels-photo-3755706.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ]

    return (
        <div className="absolute w-full h-screen overflow-hidden bg-black">
            <Marquee>
                <div className="flex gap-8 px-4 pt-8 pb-4">
                    {
                        photos.map((photo, idx) => {
                            return <div className=" static overflow-hidden max-h-72" key={idx}>
                                <Image priority
                                    // sizes="(max-width: 768px) 50vw, 100vw"
                                    width={500}
                                    height={500}
                                    style={{objectFit: 'cover'}}
                                    src={photo} alt="" 
                                    className="w-auto h-auto"
                                    />
                            </div>
                        })
                    }
                </div>
            </Marquee>
            <Marquee direction="right">
                <div className="flex gap-8  px-4 py-4">
                    {
                        photos2.map((photo, idx) => {
                            return <div className=" static overflow-hidden max-h-72" key={idx}>
                                <Image priority
                                    // sizes="(max-width: 768px) 50vw, 100vw"
                                    width={500}
                                    height={500}
                                    style={{objectFit: 'cover'}}
                                    src={photo} alt="" 
                                    className="w-auto h-auto"
                                    />
                            </div>
                        })
                    }
                </div>
            </Marquee>
            <Marquee>
                <div className="flex gap-8  px-4 py-4">
                    {
                        photos.map((photo, idx) => {
                            return <div className=" static overflow-hidden max-h-72" key={idx}>
                                <Image priority
                                    // sizes="(max-width: 768px) 50vw, 100vw"
                                    width={500}
                                    height={500}
                                    style={{objectFit: 'cover'}}
                                    src={photo} alt="" 
                                    className="w-auto h-auto"
                                    />
                            </div>
                        })
                    }
                </div>
            </Marquee>
        </div>
    )
};

