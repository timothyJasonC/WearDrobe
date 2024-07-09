import Banner from "@/app/(home)/_components/Banner"
import BestSeller from "@/app/(home)/_components/BestSeller"
import Campaign from "@/app/(home)/_components/Campaign"
import HeroCarousel from "@/app/(home)/_components/HeroCarousel"

export default function Home() {

    return (
        <main className=" space-y-12 lg:space-y-24 py-10 lg:py-20">

            <div className="flex justify-center">
                <HeroCarousel />
            </div>

            <div className="flex justify-center">
                <BestSeller all={true} headerText={"Best Seller"} />
            </div>

            <div className="flex justify-center">
                <Banner />
            </div>

            <Campaign />

            <div className="flex justify-center">
                <BestSeller all={false} headerText={"Women's Choice"} totalCol="sm:basis-1/2" />
            </div>

        </main>
    )
}
