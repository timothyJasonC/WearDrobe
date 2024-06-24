import { Metadata } from "next";

export const metadata: Metadata = {
    title: {
      template: '%s | Weardrobe',
      default: 'Weardrobe',
    },
    description: 'Weardrobe admin dashboard.',
  };

export default async function Page({params} : {params: {slug:string}})  {
    return (
        <div>
            <p>Men</p>
        </div>
    )
}