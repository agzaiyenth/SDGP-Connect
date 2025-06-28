// Copyright (c) 2025, Psycode Lab's (https://www.psycodelabs.lk). All Rights Reserved.
//
// This software is the property of Psycode Lab's. and its suppliers, if any.
// Dissemination of any information or reproduction of any material contained
// herein in any form is strictly forbidden, unless permitted by Psycode Lab's expressly.
// You may not alter or remove any copyright or other notice from copies of this content.
'use client';

import { motion } from 'framer-motion';
import Image from "next/image";
import Link from 'next/link';
import { Button } from '../ui/button';
import BadgeComponent from './bestWebBadge';
import Carousel from './carousel';
import MorphingText from './Morphing';
import { useLanguage } from "@/hooks/LanguageProvider";
import dynamic from 'next/dynamic';
const ThreeScene = dynamic(() => import('./three-scene'), { ssr: false });

const Logo: React.FC = () => (
  <motion.div
    initial={{ scale: 1.8, opacity: 0 }}
    animate={{ scale: 2, opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="mb-6 md:mb-10 flex justify-center items-center"
  >
    <div className="relative">
      <Image
        src="/iconw.svg"
        alt="SDGP Logo"
        className="h-24 w-24 sm:h-32 sm:w-32 md:h-48 md:w-48 -mb-6 sm:-mb-8 md:-mb-17 -mt-4 sm:-mt-6 md:-mt-12"
        width={88}
        height={88}
        priority
      />
    </div>

  </motion.div>
)

function getNested(obj: any, path: string[], fallback: any = undefined) {
  return path.reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : fallback), obj);
}

export default function Hero() {
  const { t } = useLanguage();
  const homeHero = getNested(t, ['home', 'hero'], {});
  return (
    <section className="min-h-screen w-full flex flex-col items-center justify-center overflow-hidden perspective-1000 ">
      <ThreeScene />
      <BadgeComponent />

      <motion.div
        className="relative z-10 text-center max-w-7xl px-6 flex-1 flex flex-col gap-5 items-center justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="inline-block px-6 py-2 mb-2 text-sm font-medium tracking-wider text-white bg-[#2a5298]/20 rounded-full border border-[#2a5298]/30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {homeHero.badge || "Innovative • Creative • Impactful"}
        </motion.div>

        <motion.h1
          className="text-6xl md:text-7xl font-bold  bg-gradient-to-r from-[#2a5298] via-[#9bb9ec] to-[#2a5298] bg-clip-text text-transparent "
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Logo />
        </motion.h1>

        <motion.div
          className=""
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <MorphingText
            texts={[
              homeHero.morphingtext1 || "Transforming Ideas Into Brands",
              homeHero.morphingtext2 || "Crafting Digital Experiences",
              homeHero.morphingtext3 || "Building Tomorrow's Solutions",
              homeHero.morphingtext4 || "Creating Innovative Designs"
            ]}
            className="text-xl md:text-2xl text-foreground/80  w-120 "
          />
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row justify-center gap-5 -mt-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          >
          <div className="flex-1">
            <Link href="/project">
              <Button className="w-full px-8 py-3 rounded-full text-sm font-medium transition-all duration-200 bg-primary text-primary-foreground hover:bg-primary/90">
                  {homeHero.explore_button || "Explore projects"}
              </Button>
            </Link>
          </div>
          <div className="flex-1">
            <Link href="/about">
              <Button className="w-full px-8 py-3 rounded-full text-sm font-medium transition-all duration-200 bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-primary/30">
                {homeHero.learn_more_button || "Learn more"}
              </Button>
            </Link>
          </div>
          <div className="flex-1">
            <a
              href="https://www.iit.ac.lk/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="w-full px-8 py-3 rounded-full text-sm font-medium transition-all duration-200 bg-primary text-primary-foreground hover:bg-primary/90">
                {homeHero.campus_button || "Visit IIT"}
              </Button>
            </a>
          </div>
          </motion.div>
          
        <Carousel />
      </motion.div>
    </section>
  );
}