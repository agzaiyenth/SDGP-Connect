/* Copyright (c) 2025, the contributors of the SDGP Connect project. All Rights Reserved.

This software is the joint property of the contributors to the SDGP Connect project.
Unauthorized distribution, commercial use, or reproduction of any part of this material
in any form is strictly prohibited without the explicit written consent of all contributors.
You may not alter or remove any copyright or attribution notice from this content. */

import Image from "next/image"
import Link from "next/link"
import { Calendar } from "lucide-react"
import { format } from "date-fns"

interface CompetitionCardProps {
  id: string
  title: string
  cover: string
  type: string
  startDate: string
  endDate: string
  logo: string
  viewLink: string
  description: string
  winnersCount: number
}

export default function CompetitionCard({
  id,
  title,
  cover,
  type,
  startDate,
  endDate,
  logo,
  viewLink,
  description,
  winnersCount
}: CompetitionCardProps) {
  // Format dates
  const formattedStart = startDate ? format(new Date(startDate), "MMM d yyyy") : ""
  const formattedEnd = endDate ? format(new Date(endDate), "MMM d yyyy") : ""
  return (
    <Link href={viewLink} className="group block h-full">
      <div className="relative bg-secondary rounded-2xl overflow-hidden border border-black hover:border-gray-700 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-950/20 min-h-[450px] flex flex-col">
        {/* Subtle Blue Glow on Hover */}
        <div className=" bg-blue-950 absolute inset-0  opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl"></div>

        {/* Competition Image */}
        <div className="relative h-48 w-full overflow-hidden flex-shrink-0">
          <Image
            src={cover}
            alt={title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

          {/* Type Badge */}
          <div className="absolute top-3 left-3">
            <span className="bg-black/80 backdrop-blur-sm border border-gray-800 px-2.5 py-1.5 rounded-full text-xs font-medium text-white">
              {type}
            </span>
          </div>

          {/* Winners Count */}
          <div className="absolute bottom-3 right-3">
            <div className="bg-secondary text-white px-2.5 py-1.5 rounded-full text-xs font-bold shadow-lg border border-gray-700">
              {winnersCount} Winners
            </div>
          </div>
        </div>
        {/* Competition Details */}
        <div className="p-4 pb-6 flex flex-col flex-grow justify-between">
          <div className="space-y-2.5">
            <h3 className="text-lg font-bold text-white group-hover:text-gray-200 transition-colors duration-300 line-clamp-2 min-h-[3.5rem]">
              {title}
            </h3>
            <p className="text-gray-200 leading-relaxed text-sm line-clamp-3 min-h-[3.75rem]">
              {description}
            </p>
          </div>
          <div className="space-y-2.5 mt-3">
            <div className="flex items-center justify-between text-xs text-gray-200">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3 h-3" />
                <span className="truncate">{formattedStart} - {formattedEnd}</span>
              </div>
            </div>
          </div>
        </div>
        {/* Bottom-right Arrow Link */}
        <a
          href={viewLink}
          onClick={e => { e.stopPropagation(); }}
          className="absolute bottom-4 right-4 z-20 border border-white rounded-full w-10 h-10 flex items-center justify-center group-hover:bg-gray-800 transition-colors duration-300 shadow-lg"
          title="View Competition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-white">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M7 7h10v10" />
          </svg>
        </a>
      </div>
    </Link>
  )
}
