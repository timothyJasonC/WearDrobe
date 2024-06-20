

export const Footer = () => {
    return (
        <div 
            className='relative h-[500px] lg:h-[800px] bg-black'
            style={{clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)"}}
        >
        <div className='relative h-[calc(100vh+500px)] lg:h-[calc(100vh+800px)] -top-[100vh]'>
            <div className='
                h-[500px] lg:h-[800px] 
                sticky top-[calc(100vh-500px)] lg:top-[calc(100vh-800px)]
                lg:p-10 p-4 text-white/60
                flex flex-col justify-between
            '>

                <div className="flex lg:gap-20 gap-10">
                    <div className="flex flex-col">
                        <h6 className="font-bold text-white mb-4 text-lg">Company</h6> 
                        <a className="">About us</a>
                        <a className="">Contact</a>
                        <a className="">Career</a>
                        <a className="">Customer Service</a>
                        <a className="">Return Policy</a>
                    </div>
                    <div className="flex flex-col">
                        <h6 className="font-bold text-white mb-4 text-lg">Store</h6> 
                        <a className="">Tops</a>
                        <a className="">Bottoms</a>
                        <a className="">Accessories</a>
                    </div>
                </div>

                <div className="flex justify-between items-end max-lg:flex-col max-lg:items-start">
                    <h1 className="text-white lg:text-9xl text-4xl font-thin">WearDrobe</h1>
                    <span>Copyright &copy; 2024 - All right reserved</span>
                </div>
            </div>
        </div>
        </div>
    );
};