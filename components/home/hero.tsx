'use client';

import { useLanguage } from '@/hooks/LanguageProvider';
import { motion } from 'framer-motion';
import { Mouse } from 'lucide-react';
import Image from "next/image";
import Link from 'next/link';
import { Button } from '../ui/button';
import Carousel from './carousel';
import ThreeScene from './three-scene';

const Logo: React.FC = () => (
  <motion.div 
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="mb-10 flex justify-center items-center "
  >
    <div className="relative">
      <Image
        src="/iconw.svg"
        alt="Logoipsum"
        className="h-48 w-48 -mb-26 -mt-14"
        width={88}
        height={88}
        priority // Ensure logo is prioritized for LCP
      />
    </div>
   
  </motion.div>
)

export default function Hero() {
   const { t } = useLanguage();
  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden perspective-1000 ">
      <ThreeScene />

      <motion.div
        className="relative z-10 text-center max-w-7xl px-6 flex-1 flex flex-col items-center justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >        <motion.div
          className="inline-block px-6 py-2 mb-4 text-sm font-medium tracking-wider text-white bg-[#2a5298]/20 rounded-full border border-[#2a5298]/30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {t.home_hero_badge_text}
        </motion.div>

        <motion.h1
          className="text-6xl md:text-7xl font-bold mb-3 bg-gradient-to-r from-[#2a5298] via-[#9bb9ec] to-[#2a5298] bg-clip-text text-transparent "
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Logo/>
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-foreground/80 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          {t.home_hero_tagline}
        </motion.p>

        <motion.div
          className="flex justify-center gap-5 -mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >          <Link href='/project'>
            <Button className="px-8 py-3 rounded-full text-sm font-medium transition-all duration-200 bg-primary text-primary-foreground hover:bg-primary/90">
              {t.home_hero_button_explore}
            </Button>
          </Link>
          <Link href='/about'>
            <Button className="px-8 py-3 rounded-full text-sm font-medium transition-all duration-200 bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-primary/30">
              {t.home_hero_button_learn}
            </Button>
          </Link>
        </motion.div>

        <Carousel />

        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <div className=" w-10 h-12 rounded-full bg-[#27272e]/80 flex items-center justify-center mb-2 animate-bounce border border-[#27272e]/90">
            <Mouse className="w-5 h-5 text-[#ffffff]" />
          </div>          <span className="text-sm text-[#ffffff]/80 tracking-wider">
            {t.home_hero_scroll_text}
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}