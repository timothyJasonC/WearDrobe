


export default async function Page({params} : {params: {slug:string}})  {
    return (
        <div>
            <div>{params.slug}</div>
        </div>
    )
}