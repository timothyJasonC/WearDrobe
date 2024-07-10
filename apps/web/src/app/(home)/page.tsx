import Banner from "@/app/(home)/_components/Banner"
import BestSeller from "@/app/(home)/_components/BestSeller"
import Campaign from "@/app/(home)/_components/Campaign"
import HeroCarousel from "@/app/(home)/_components/HeroCarousel"
import WomenChoice from "./_components/WomenChoice"
import MenChoice from "./_components/MenChoice"

export default function Home() {

    return (
        <main className=" space-y-12 lg:space-y-24 pt-10 lg:pt-20">

            <div className="flex justify-center">
                <HeroCarousel />
            </div>
            <WomenChoice />
            {/* <div className="flex justify-center">
                <BestSeller all={true} headerText={"Best Seller"} data={[]} />
            </div> */}

            <div className="flex justify-center">
                <Banner />
            </div>
            <MenChoice />
            <Campaign />

        </main>
    )
}
