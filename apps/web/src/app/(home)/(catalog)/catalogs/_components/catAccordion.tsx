import { getCategory } from "@/app/action"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { ICategory } from "@/constants"
import Link from "next/link"
import { useEffect, useState } from "react"
import { PiDotOutlineFill } from "react-icons/pi"

interface ITypes {
  tops: ICategory[]
  bottoms: ICategory[]
  accessories: ICategory[]
}  

interface IActiveCat {
  g:string, 
  c:string
}
  
export function CatAccordion({gender, activeCat}:{gender:string, activeCat:IActiveCat}) {
    const [data, setData] = useState<ITypes>()
    
    useEffect(() => {
      const getData = async() => {
        const res = await getCategory((gender == 'Select' ? 'men' : gender.toLowerCase()), '')
        setData(res)
      }
      getData()
    }, [gender])

    console.log(activeCat);
    

    
    return (
      <Accordion type="single"  className="w-full" defaultValue="item-1">
        <AccordionItem value="item-1">
          <AccordionTrigger className="hover:no-underline">Tops</AccordionTrigger>
          <AccordionContent>
            <div className="flex items-center mb-2">
              <PiDotOutlineFill />
              <p className="">All Tops Collections</p>
            </div>
            {data?.tops.map((item:ICategory) => {
                return (
                    <Link
                    href={`/catalogs?g=${(gender == 'Select' ? 'men' : gender.toLowerCase())}&t=${'tops'}&c=${item.slug}`}
                    key={item.id}
                    className="flex items-center mb-2 hover:cursor-pointer">
                        <PiDotOutlineFill />
                        <p className={activeCat.c == item.slug && activeCat.g == gender.toLowerCase() ? 'font-semibold' : ''}>{item.category}</p>
                    </Link>
                )
            })}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="hover:no-underline">Bottoms</AccordionTrigger>
          <AccordionContent>
            <div className="flex items-center mb-2">
              <PiDotOutlineFill />
              <p>All Bottoms Collections</p>
            </div>
            {data?.bottoms.map((item:ICategory) => {
                    return (
                      <Link
                      href={`/catalogs?g=${(gender == 'Select' ? 'men' : gender.toLowerCase())}&t=${'bottoms'}&c=${item.slug}`}
                      key={item.id}
                      className="flex items-center mb-2 hover:cursor-pointer">
                          <PiDotOutlineFill />
                          <p className={activeCat.c == item.slug && activeCat.g == gender.toLowerCase() ? 'font-semibold' : ''}>{item.category}</p>
                      </Link>
                    )
                })}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger className="hover:no-underline">Accessories</AccordionTrigger>
          <AccordionContent>
            <div className="flex items-center mb-2">
              <PiDotOutlineFill />
              <p>All Accessories Collections</p>
            </div>
            {data?.accessories.map((item:ICategory) => {
                    return (
                      <Link
                      href={`/catalogs?g=${(gender == 'Select' ? 'men' : gender.toLowerCase())}&t=${'accessories'}&c=${item.slug}`} key={item.id}
                      className="flex items-center mb-2 hover:cursor-pointer">
                          <PiDotOutlineFill />
                          <p className={activeCat.c == item.slug && activeCat.g == gender.toLowerCase() ? 'font-semibold' : ''}>{item.category}</p>
                      </Link>
                    )
                })}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    )
  }
  