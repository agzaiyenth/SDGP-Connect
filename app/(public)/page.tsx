
import { About } from "@/components/home/about-section";
import AllProjects from "@/components/home/all-projects";
import { Brands } from "@/components/home/brands";
import ExploreByDomain from "@/components/home/explore-by-domain";
import FeaturedProjects from "@/components/home/featured-projects";
import Hero from "@/components/home/hero";
// import ImpactStats from "@/components/home/impact-stats";
import ImpactSection from "@/components/home/impact-section";



export default function Home() {
  return (
    <div className="flex flex-col gap-12 pb-12">
      <Hero />
      <About />
      <FeaturedProjects />
      <ImpactSection />
      <ExploreByDomain />
      <AllProjects />
      <Brands/>
    </div>
  )
}