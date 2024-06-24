import React from "react"
import { DialogCreateAdmin } from "./_components/DialogCreateAdmin"

export default function Page() {
    return (
        <div className=" w-full py-10 px-10 md:px-20">
            
            <div className='flex w-full mb-7 flex-col-reverse xl:flex-row'>
                <div className='flex gap-5 md:gap-10 max-md:flex-wrap'>
                {/* <StatisticsCard 
                    title='Products'
                    number={product.productList.length}
                    modalElement={<CreateProductDialog />}
                /> */}
                {/* <StatisticsCard 
                    title='Categories'
                    number={category.category.length}
                    modalElement={<ManageCategoryDialog />}
                /> */}
                </div>
                <div className='flex flex-col w-full items-end mb-7'>
                    <DialogCreateAdmin />
                </div>
            </div>

            
        </div>
    )
};

