import { AboutSection } from '@/components/about/about';
import { About } from "@/components/home/about-section";
import { Brands } from "@/components/home/brands";
import Domains from "@/components/home/domains";
import Featured from "@/components/home/featured";
import Hero from "@/components/home/hero";
import ImpactStats from "@/components/home/impact-stats";
import { ExpandableChatDemo } from "@/components/ui/demo-expandable-chat";



export default function Home() {
  return (
    <div className="flex flex-col gap-12 pb-12">
      <Hero />
      <About />
      <AboutSection/>
      <Featured/>
      <Domains />
      <ImpactStats />
      <Brands/>

    </div>
  )
}