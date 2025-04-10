'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const images = [
  '/home/hero/1.jpg',
  '/home/hero/2.jpg',
  '/home/hero/3.jpg',
  '/home/hero/4.jpg',
  '/home/hero/5.jpg',
  '/home/hero/6.jpg',
  '/home/hero/7.jpg',
  '/home/hero/8.jpg',
  '/home/hero/9.jpg',
  '/home/hero/10.jpg',
];

export default function Carousel() {
  const duplicatedImages = [...images, ...images];

  return (
    <div className="mb-12 mt-10 relative w-full overflow-hidden h-calc-[calc(100vh-4rem)] md:h-calc-[calc(100vh-6rem)] lg:h-calc-[calc(100vh-8rem)]">
      <div className="absolute top-0 h-full w-32 pointer-events-none z-10 left-0 bg-gradient-to-r from-background to-transparent" />
      <motion.div 
        className="carousel-track flex gap-4" 
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 40, ease: 'linear', repeat: Infinity }}
      >
        {duplicatedImages.map((image, index) => (
            <div key={index} className="flex-none relative rounded-lg overflow-hidden w-[400px] aspect-video">
            <Image
              src={image}
              alt={`Carousel image ${index + 1}`}
             fill
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