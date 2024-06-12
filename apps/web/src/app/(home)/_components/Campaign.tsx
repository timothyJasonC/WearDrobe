import React from "react"
import { Button } from "../../../components/ui/button"


export default function Campaign() {

    const imgUrl2 = 'https://images.unsplash.com/photo-1495556650867-99590cea3657?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    // const imgUrl = 'https://img.freepik.com/free-photo/carpets-market-morocco_23-2148129886.jpg?t=st=1717836613~exp=1717840213~hmac=133f43f11aaa9750cd5c923f4b833fdfa3e3dd0b689aff9ad4a565ce60c58d59&w=1480'
    const imgUrl = 'https://images.pexels.com/photos/802221/pexels-photo-802221.jpeg'
    // const imgUrl = 'https://images.unsplash.com/photo-1606053929013-311c13f97b5f?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    // const imgUrl = 'https://images.unsplash.com/photo-1562591970-254bc62245c0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    // const imgUrl = 'https://images.unsplash.com/photo-1642631171488-23d631eba638?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    // const imgUrl = 'https://images.unsplash.com/photo-1670327368012-047cce1558c9?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    // const imgUrl = 'https://images.unsplash.com/photo-1670327368741-8c1e4d82d52a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    // const imgUrl = 'https://images.unsplash.com/photo-1572964782790-92b2dccabe68?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    // const imgUrl = 'https://images.unsplash.com/photo-1706612204508-d48772f8731b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    // const imgUrl = 'https://images.unsplash.com/photo-1558640476-437a2b9438a2?q=80&w=1942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    // const imgUrl = 'https://images.unsplash.com/photo-1632247620837-970aa94d2b99?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    // const imgUrl = 'https://images.unsplash.com/photo-1621451537084-482c73073a0f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

    return (
        <div className="relative">
            <div className="flex">
                <img className="lg:h-[30rem] w-full object-cover" style={{objectPosition: '50% 70%'}} src={imgUrl} alt="" />
            </div>
            <div className="
                flex justify-center flex-col items-center absolute top-0 w-full h-full
                gap-8 text-white z-[1]
            ">
                <div className="text-center flex flex-col items-center gap-2">
                    <p className="font-extralight lg:text-3xl text-2xl h-5 flex items-center"> We're Committed to a Healthier Environment</p>
                    <p className="font-light text-white/75 hidden sm:block">Read about our progress in our latest impact report.</p>
                </div>
                <Button className="px-8 bg-white text-black hover:text-white font-light">Learn more</Button>
            </div>
            <div className="w-full h-full bg-black/40 absolute top-0 left-0"></div>
        </div>
    )
};

