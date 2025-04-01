"use client"

import Image from "next/image"
import { Badge } from "../../components/ui/badge"
import { Button } from "../../components/ui/button"
import { Play } from "lucide-react"
import { motion } from "framer-motion"
import type { Project } from "../../types"

interface ProjectHeroProps {
  project: Project
}

export default function ProjectHero({ project }: ProjectHeroProps) {
  return (
    <div className="relative w-full h-[70vh]">
      {/* Cover Image */}
      <div className="absolute inset-0">
        <Image
          src={project.coverImage || "/placeholder.svg"}
          alt={project.title}
          fill
          className="object-cover"
          priority
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 w-full p-8 z-10">
        <div className="container mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex items-center gap-3 mb-3">
              <Badge className="bg-red-600 text-white">{project.status}</Badge>
              <span className="text-gray-300">{project.domains[0]}</span>
            </div>

            <h1 className="text-5xl font-bold mb-3">{project.title}</h1>
            <p className="text-xl text-gray-300 mb-6 max-w-2xl">{project.subtitle}</p>

            <div className="flex gap-3 mt-6">
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white px-8">
                <Play className="mr-2 h-4 w-4" /> VIEW DEMO
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 hover:bg-white/10 text-white">
                CONTACT
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

