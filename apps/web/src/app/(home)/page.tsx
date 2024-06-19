import Banner from "@/app/(home)/_components/Banner"
import BestSeller from "@/app/(home)/_components/BestSeller"
import Campaign from "@/app/(home)/_components/Campaign"
import HeroCarousel from "@/app/(home)/_components/HeroCarousel"

export default function Home() {
  return (
    <main className=" space-y-12 lg:space-y-24">

        <div className="flex justify-center mt-10 lg:mt-20">
            <HeroCarousel />
        </div>

        <div className="flex justify-center">
            <BestSeller />
        </div>

        <div className="flex justify-center">
            <Banner />
        </div>

        <Campaign />

    </main>
  )
}
