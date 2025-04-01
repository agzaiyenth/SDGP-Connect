import Image from "next/image"
import { Mail, Phone } from "lucide-react"
import type { Lecturer } from "../../types"

interface TeamLeaderCardProps {
  teamLeader: Lecturer
}

export default function TeamLeaderCard({ teamLeader }: TeamLeaderCardProps) {
  return (
    <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
      <h2 className="text-xl font-bold mb-4">Team Leader</h2>
      <div className="flex items-center gap-4 mb-4">
        <div className="relative w-16 h-16 rounded-full overflow-hidden">
          <Image src={teamLeader.image || "/placeholder.svg"} alt={teamLeader.name} fill className="object-cover" />
        </div>
        <div>
          <h3 className="font-bold">{teamLeader.name}</h3>
          <p className="text-gray-400">{teamLeader.role}</p>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-gray-300">
          <Mail className="h-4 w-4" />
          <a href={`mailto:${teamLeader.email}`} className="hover:text-white transition-colors">
            {teamLeader.email}
          </a>
        </div>
        {teamLeader.phone && (
          <div className="flex items-center gap-2 text-gray-300">
            <Phone className="h-4 w-4" />
            <a href={`tel:${teamLeader.phone}`} className="hover:text-white transition-colors">
              {teamLeader.phone}
            </a>
          </div>
        )}
      </div>
    </div>
  )
}