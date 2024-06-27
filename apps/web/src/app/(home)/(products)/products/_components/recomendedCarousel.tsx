import React, { useEffect, useState } from "react"
import { type CarouselApi } from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { IProduct } from "@/constants"
import Image from "next/image"
import { getCatalog } from "@/app/action"
import { ProductCard } from "@/components/ui/productCard"

interface IRecommendedCarousel {
    gender: string
    type: string
}



export function RecommendedCarousel({gender, type}:IRecommendedCarousel) {
    const [productList, setProductList] = useState<IProduct[]>([])
    
    useEffect(() => {
        const getData = async() => {
          const product = await getCatalog(gender, type,'', '',  'newest',  '1')
          if (product.status == 'ok') {
            setProductList(product.productList)
          }
        }
        getData()
      }, [gender, type])


  return (
    <Carousel className="my-5 group"  opts={{
        align: "center",
      }}>
      <CarouselContent className=" xl:-ml-12">
        {productList.map((item, idx) => (
            <CarouselItem 
            key={item.id}
            className="basis-1/2 md:basis-1/3 lg:basis-1/4 max-lg:mr-5 max-xl:mr-10 xl:pl-12">
                <div key={item.id} className="my-2">
                  <ProductCard 
                  gender={item.category.gender}
                  name={item.name}
                  oneSize={item.oneSize}
                  price={item.price}
                  slug={item.slug}
                  thumbnailURL={item.thumbnailURL}
                  totalStock={item.totalStock}
                  variants={item.variants}
                  />
              </div>
            </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-0 rounded-sm group-hover:flex hidden"  />
      <CarouselNext className="absolute right-0 rounded-sm group-hover:flex hidden"/>
    </Carousel>
  )
}
