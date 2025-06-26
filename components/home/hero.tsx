'use client';

import { motion } from 'framer-motion';
import { ChevronDown, Mouse } from 'lucide-react';
import ThreeScene from './three-scene';
import Carousel from './carousel';
import { Button } from '../ui/button';
import Link from 'next/link';
import Image from "next/image"
import { useState, useEffect } from 'react';

const Logo: React.FC = () => (
  <motion.div 
    initial={{ scale: 1.8, opacity: 0 }}
    animate={{ scale: 2, opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="mb-10 flex justify-center items-center "
  >
    <div className="relative">
      <Image
        src="/iconw.svg"
        alt="SDGP Logo"
        className="h-48 w-48 -mb-17 -mt-12"
        width={88}
        height={88}
        priority 
      />
    </div>
   
  </motion.div>
)
const BadgeComponent: React.FC = () => (
  <div className="fixed z-50 shadow-lg rounded-lg overflow-hidden top-8 right-8 md:top-27 md:right-12">
    <a 
      href="https://ebadge.bestweb.lk/api/v1/clicked/sdgp.lk/BestWeb/2025/Rate_Us"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img 
        src="https://ebadge.bestweb.lk/eBadgeSystem/domainNames/sdgp.lk/BestWeb/2025/Rate_Us/image.png" 
        alt="BestWeb Badge" 
        width={120} 
        height={120}
        className="transition-transform hover:scale-105 w-24 h-24 md:w-36 md:h-36"
      />
    </a>
  </div>
)
interface MorphingTextProps {
  texts: string[];
  className?: string;
}

const MorphingText: React.FC<MorphingTextProps> = ({ texts, className }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState(texts[0]);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
        setDisplayText(texts[(currentIndex + 1) % texts.length]);
        setIsAnimating(false);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex, texts]);

  return (
    <div className={className + " flex flex-col gap-4"}>
      <h1 className="text-2xl md:text-3xl max-w-2xl tracking-tighter text-center font-regular">
      <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1">
        &nbsp;
        {texts.map((text, index) => (
        <motion.span
          key={index}
          className="absolute font-semibold"
          initial={{ opacity: 0, y: -100 }}
          animate={
          currentIndex === index
            ? { y: 0, opacity: 1 }
            : { y: currentIndex > index ? -100 : 100, opacity: 0 }
          }
          transition={{ type: "spring", stiffness: 50 }}
        >
          {text}
        </motion.span>
        ))}
      </span>
      </h1>
    </div>
  );
};

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden perspective-1000 ">
      <ThreeScene />
      <BadgeComponent />

      <motion.div
        className="relative z-10 text-center max-w-7xl px-6 flex-1 flex flex-col items-center justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="inline-block px-6 py-2 mb-4 text-sm font-medium tracking-wider text-white bg-[#2a5298]/20 rounded-full border border-[#2a5298]/30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Innovative • Creative • Impactful
        </motion.div>

        <motion.h1
          className="text-6xl md:text-7xl font-bold mb-3 bg-gradient-to-r from-[#2a5298] via-[#9bb9ec] to-[#2a5298] bg-clip-text text-transparent "
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Logo/>
        </motion.h1>

        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <MorphingText 
            texts={[
              "Transforming Ideas Into Brands",
              "Crafting Digital Experiences",
              "Building Tomorrow's Solutions",
              "Creating Innovative Designs"
            ]} 
            className="text-xl md:text-2xl text-foreground/80 -mb-8 w-120 "
          />
        </motion.div>

        <motion.div
          className="flex justify-center gap-5 -mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Link href='/project'>
            <Button className="px-8 py-3 rounded-full text-sm font-medium transition-all duration-200 bg-primary text-primary-foreground hover:bg-primary/90">
              Explore projects
            </Button>
          </Link>
          <Link href='/about'>            
            <Button className="px-8 py-3 rounded-full text-sm font-medium transition-all duration-200 bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-primary/30">
              Learn more
            </Button>
          </Link>
          <a
              href="https://www.iit.ac.lk/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="px-8 py-3 rounded-full text-sm font-medium transition-all duration-200 bg-primary text-primary-foreground hover:bg-primary/90">
                Visit Our Campus
              </Button>
          </a>

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
          </div>
          <span className="text-sm text-[#ffffff]/80 tracking-wider">
            Scroll to discover
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}