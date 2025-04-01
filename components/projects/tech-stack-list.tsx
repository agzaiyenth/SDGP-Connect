import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"

export default function TechStackList({ stack }: { stack: string[] }) {
  // Map of tech stack items to their logos/icons
  // In a real app, you'd use actual logos
  const techIcons: Record<string, string> = {
    React: "R",
    "Next.js": "N",
    TypeScript: "TS",
    Python: "Py",
    TensorFlow: "TF",
    Flutter: "Fl",
    "Node.js": "No",
    MongoDB: "Mo",
    Firebase: "Fi",
    AWS: "AWS",
    Docker: "Do",
    Express: "Ex",
  }

  return (
    <TooltipProvider>
      <div className="flex flex-wrap gap-3">
        {stack.map((tech) => (
          <Tooltip key={tech}>
            <TooltipTrigger asChild>
              <div className="w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center text-sm font-medium hover:bg-zinc-700 transition-colors">
                {techIcons[tech] || tech.substring(0, 2)}
              </div>
            </TooltipTrigger>
            <TooltipContent className="bg-zinc-900 border-zinc-800">
              <p>{tech}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  )
}

