/* Copyright (c) 2025, the contributors of the SDGP Connect project. All Rights Reserved.

This software is the joint property of the contributors to the SDGP Connect project.
Unauthorized distribution, commercial use, or reproduction of any part of this material
in any form is strictly prohibited without the explicit written consent of all contributors.
You may not alter or remove any copyright or attribution notice from this content. */

import { AboutSection } from '@/components/about/about';
import { About } from "@/components/home/about-section";
import { Brands } from "@/components/home/brands";
import Domains from "@/components/home/domains";
import Hero from "@/components/home/hero";
import ImpactStats from "@/components/home/impact-stats";



export default function Home() {
  return (
    <div className="flex flex-col gap-12 pb-12">
      <Hero />
      <About />
      <AboutSection />
      <Domains />
      <ImpactStats />
      <Brands />
    </div>
  )
}