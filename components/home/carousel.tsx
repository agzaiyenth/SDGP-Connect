'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const images = [
  'https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=2069&auto=format&fit=crop',
  '/Lexi/1.jpg',
  'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2071&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1447433589675-4aaa569f3e05?q=80&w=2080&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?q=80&w=2013&auto=format&fit=crop',
];

export default function Carousel() {
  const duplicatedImages = [...images, ...images];

  return (
    <div className="mb-12 mt-10 relative w-full overflow-hidden mt-4 h-calc-[calc(100vh-4rem)] md:h-calc-[calc(100vh-6rem)] lg:h-calc-[calc(100vh-8rem)]">
      <div className="absolute top-0 h-full w-32 pointer-events-none z-10 left-0 bg-gradient-to-r from-background to-transparent" />
      <motion.div 
        className="carousel-track flex gap-4" 
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 40, ease: 'linear', repeat: Infinity }}
      >
        {duplicatedImages.map((image, index) => (
            <div key={index} className="flex-none relative rounded-lg overflow-hidden w-[400px] aspect-video">
            <img
              src={image}
              alt={`Carousel image ${index + 1}`}
            
              className="object-cover"
              sizes="(max-width: 400px) 100vw, 400px"
            />
            </div>
        ))}
      </motion.div>
      <div className="absolute top-0 h-full w-32 pointer-events-none z-10 right-0 bg-gradient-to-l from-background to-transparent" />
    </div>
  );
}