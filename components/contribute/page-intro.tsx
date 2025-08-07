"use client"

import { motion, type CubicBezier } from "framer-motion" // Import CubicBezier
import { cn } from "@/lib/utils"

export default function PageIntro({
  badge = "SDGP Connect",
  title = "Contribute to Our Project",
  description = "Join us in building the future of student-led tech projects. Your contributions make a difference!",
}: {
  badge?: string
  title?: string
  description?: string
}) {
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.5 + i * 0.2,
        ease: [0.25, 0.4, 0.25, 1] as CubicBezier, // Explicitly cast to CubicBezier
      },
    }),
  }

  return (
    <div className="text-center mb-12 md:mb-16 w-full">
      <motion.div
        custom={0}
        variants={fadeUpVariants}
        initial="hidden"
        animate="visible"
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] mb-4"
      >
        <span className="text-sm text-white/60 tracking-wide">{badge}</span>
      </motion.div>

      <motion.h1
        custom={1}
        variants={fadeUpVariants}
        initial="hidden"
        animate="visible"
        className="text-4xl sm:text-6xl md:text-7xl font-bold mb-6 md:mb-8 tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80"
      >
        {title}
      </motion.h1>

      <motion.p
        custom={2}
        variants={fadeUpVariants}
        initial="hidden"
        animate="visible"
        className="text-base sm:text-lg md:text-xl text-white/40 leading-relaxed font-light tracking-wide max-w-2xl mx-auto px-4"
      >
        {description}
      </motion.p>
    </div>
  )
}
