'use client';

import { motion } from 'framer-motion';
import { ChevronDown, Mouse } from 'lucide-react';
import ThreeScene from './three-scene';
import Carousel from './carousel';

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden perspective-1000">
      <ThreeScene />
      
      <motion.div
        className="relative z-10 text-center max-w-7xl px-6 flex-1 flex flex-col items-center justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="inline-block px-6 py-2 mb-8 text-sm font-medium tracking-wider text-primary bg-accent/20 rounded-full border border-primary/30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Innovative • Creative • Impactful
        </motion.div>

        <motion.h1
          className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-white to-primary bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          SDGP-Connect
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-foreground/80 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          Transforming Ideas Into Brands
        </motion.p>

        <motion.div
          className="flex justify-center gap-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <button className="px-8 py-3 rounded-full text-sm font-medium transition-all duration-200 bg-primary text-primary-foreground hover:bg-primary/90">
            Explore Projects
          </button>
          <button className="px-8 py-3 rounded-full text-sm font-medium transition-all duration-200 bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-primary/30">
            Learn More
          </button>
        </motion.div>

        <Carousel />

        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <div className="w-10 h-12 rounded-full bg-[#6366f1]/20 flex items-center justify-center mb-2 animate-bounce border border-[#6366f1]/30">
            <Mouse className="w-5 h-5 text-[#6366f1]" />
          </div>
          <span className="text-sm text-[#6366f1]/80 tracking-wider">
            Scroll to discover
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}