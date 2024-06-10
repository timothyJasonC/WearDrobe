import Banner from "@/components/landingPage/Banner"
import BestSeller from "@/components/landingPage/BestSeller"
import Campaign from "@/components/landingPage/Campaign"
import HeroCarousel from "@/components/landingPage/HeroCarousel/HeroCarousel"

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
