/* Copyright (c) 2025, the contributors of the SDGP Connect project. All Rights Reserved.

This software is the joint property of the contributors to the SDGP Connect project.
Unauthorized distribution, commercial use, or reproduction of any part of this material
in any form is strictly prohibited without the explicit written consent of all contributors.
You may not alter or remove any copyright or attribution notice from this content. */

'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

const images = [
  '/assets/Dialog.webp',
  '/assets/1.webp',
  '/assets/2.webp',
  '/assets/Codesprint.webp',
  '/assets/4.webp',
  '/assets/3.webp',
  '/assets/innovex.webp',
  '/assets/movemate1.webp',
  '/assets/win.webp',
  '/assets/3.webp',
  '/assets/dialog-ino.webp',
];

export default function Carousel() {
  const duplicatedImages = [...images, ...images];
  
  return (
    <div className=" mt-8 relative w-full overflow-hidden h-calc-[calc(100vh-4rem)] md:h-calc-[calc(100vh-6rem)] lg:h-calc-[calc(100vh-8rem)]">
      <div className="absolute top-0 h-full w-32 pointer-events-none z-10 left-0 bg-gradient-to-r from-background to-transparent" />
      <motion.div
        className="carousel-track flex gap-4"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 17, ease: 'linear', repeat: Infinity }}
      >
        {duplicatedImages.map((image, index) => (
            <div key={index} className="flex-none relative rounded-lg overflow-hidden w-[400px] aspect-video">
            <Image
              src={image}
              alt={`Carousel image ${index + 1}`}
              className="object-cover"
              // Serve responsive images for better performance
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
              width={400}
              height={225}
              loading={index < 3 ? "eager" : "lazy"}                // load first 3 immediately
              priority={index < 3}                                   // Next.js preloads first 3
              fetchPriority={index < 3 ? "high" : undefined}  
            />
            </div>
        ))}
      </motion.div>
      <div className="absolute top-0 h-full w-32 pointer-events-none z-10 right-0 bg-gradient-to-l from-background to-transparent" />
    </div>
  );
}