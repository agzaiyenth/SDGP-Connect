// Copyright (c) 2025, Psycode Lab's (https://www.psycodelabs.lk). All Rights Reserved.
//
// This software is the property of Psycode Lab's. and its suppliers, if any.
// Dissemination of any information or reproduction of any material contained
// herein in any form is strictly forbidden, unless permitted by Psycode Lab's expressly.
// You may not alter or remove any copyright or other notice from copies of this content.
"use client";

import { AboutSection } from '@/components/about/about';
import { About } from "@/components/home/about-section";
import { Brands } from "@/components/home/brands";
import Domains from "@/components/home/domains";
import Hero from "@/components/home/hero";
import ImpactStats from "@/components/home/impact-stats";
import { LanguageProvider } from "@/hooks/LanguageProvider";
import LanguageToggle from "@/components/LanguageToggle";

export default function Home() {
  return (
    <LanguageProvider>
      <div className="flex flex-col gap-12 pb-12">
        <Hero />
        <About />
        <AboutSection/>
        <Domains />
        <ImpactStats />
        <Brands/>
      </div>
      <LanguageToggle />
    </LanguageProvider>
  )
}