import Hero from "../components/home/hero"
// import FeaturedProjects from "../components/home/featured-projects"
import AllProjects from "../components/home/all-projects"
import ImpactStats from "../components/home/impact-stats"
// import ExploreByDomain from "../components/home/explore-by-domain"
import About from "../components/home/about-section"

export default function Home() {
  return (
    <div className="flex flex-col gap-12 pb-12">
      <Hero />
      <About />
      <ImpactStats />
      {/* <FeaturedProjects /> */}
      <AllProjects />
{/*       
      <ExploreByDomain /> */}
    </div>
  )
}