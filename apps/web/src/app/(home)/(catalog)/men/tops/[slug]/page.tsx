import {  getCatalog, getCategorySlug, getProduct } from "@/app/action"
import { Selector } from "@/components/admDashboard/manageProductModal/selector";
import { Catalogs } from "../../../_components/catalogs";


export async function generateMetadata({params}: {params: {slug: string}}) {
    return {
      title: params.slug,
  
    }
  }


export default async function Page({params} : {params: {slug:string}})  {
  const category = await getCategorySlug('MEN', 'TOPS', params.slug)
  const catalog = await getCatalog('MEN', category.data.slug)

  console.log(catalog);
  
    return (
        <div className="lg:max-w-[70rem] w-full max-md:mx-5 max-xl:mx-10">
            <p className="text-4xl font-light">Men&apos;s</p>
            <h1 className="text-5xl md:text-7xl">{category.data.category}</h1>


            <Catalogs totalProduct={catalog.totalProduct}/>
            
        </div>
    )
}