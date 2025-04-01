import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"

// Mapping of SDG goals to their numbers and descriptions
const sdgMapping: Record<string, { number: number; description: string }> = {
  "No Poverty": { number: 1, description: "End poverty in all its forms everywhere" },
  "Zero Hunger": { number: 2, description: "End hunger, achieve food security and improved nutrition" },
  "Good Health": { number: 3, description: "Ensure healthy lives and promote well-being for all" },
  "Quality Education": { number: 4, description: "Ensure inclusive and equitable quality education" },
  "Gender Equality": { number: 5, description: "Achieve gender equality and empower all women and girls" },
  "Clean Water": { number: 6, description: "Ensure availability and sustainable management of water" },
  "Affordable Energy": { number: 7, description: "Ensure access to affordable, reliable, sustainable energy" },
  "Decent Work": { number: 8, description: "Promote sustained, inclusive economic growth" },
  "Industry & Innovation": {
    number: 9,
    description: "Build resilient infrastructure, promote inclusive industrialization",
  },
  "Reduced Inequalities": { number: 10, description: "Reduce inequality within and among countries" },
  "Sustainable Cities": { number: 11, description: "Make cities inclusive, safe, resilient and sustainable" },
  "Responsible Consumption": { number: 12, description: "Ensure sustainable consumption and production patterns" },
  "Climate Action": { number: 13, description: "Take urgent action to combat climate change and its impacts" },
  "Life Below Water": { number: 14, description: "Conserve and sustainably use the oceans and marine resources" },
  "Life On Land": { number: 15, description: "Protect, restore and promote sustainable use of terrestrial ecosystems" },
  "Peace & Justice": {
    number: 16,
    description: "Promote peaceful and inclusive societies for sustainable development",
  },
  Partnerships: { number: 17, description: "Strengthen the means of implementation and revitalize partnerships" },
}

export default function SdgGoalsList({ goals }: { goals: string[] }) {
  return (
    <TooltipProvider>
      <div className="flex flex-wrap gap-2">
        {goals.map((goal) => {
          const sdgInfo = sdgMapping[goal]
          return (
            <Tooltip key={goal}>
              <TooltipTrigger asChild>
                <div className="w-12 h-12 rounded-lg bg-zinc-800 overflow-hidden relative hover:bg-zinc-700 transition-colors">
                  {/* In a real app, you'd use actual SDG goal images */}
                  <div className="absolute inset-0 flex items-center justify-center font-bold text-sm">
                    SDG {sdgInfo?.number || ""}
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent className="bg-zinc-900 border-zinc-800">
                <p className="font-medium">{goal}</p>
                <p className="text-xs text-gray-400">{sdgInfo?.description}</p>
              </TooltipContent>
            </Tooltip>
          )
        })}
      </div>
    </TooltipProvider>
  )
}

