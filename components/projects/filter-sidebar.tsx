"use client"

import { useState } from "react"
import { Check, ChevronDown } from "lucide-react"
import { cn } from "../../lib/utils"
import { Button } from "../ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible"
import { Badge } from "../ui/badge"
import {
  projectStatusOptions,
  projectTypeOptions,
  sdgGoals,
  techStackOptions
} from "../../types/project/mapping"

type FilterSectionProps = {
  title: string
  options: { value: string; label: string }[]
  selection: string[]
  setSelection: (selection: string[]) => void
}

function FilterSection({ title, options, selection, setSelection }: FilterSectionProps) {
  const [isOpen, setIsOpen] = useState(true)

  const toggleOption = (value: string) => {
    if (selection.includes(value)) {
      setSelection(selection.filter((item) => item !== value))
    } else {
      setSelection([...selection, value])
    }
  }

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
      <CollapsibleTrigger asChild>
        <Button variant="ghost" className="flex w-full justify-between p-2 font-medium">
          {title}
          <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "transform rotate-180")} />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="pt-2 pb-4 space-y-2">
          {options.map((option) => (
            <div
              key={option.value}
              className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-muted cursor-pointer"
              onClick={() => toggleOption(option.value)}
            >
              <div
                className={cn(
                  "h-4 w-4 rounded border flex items-center justify-center",
                  selection.includes(option.value) ? "bg-primary border-primary" : "border-muted-foreground",
                )}
              >
                {selection.includes(option.value) && <Check className="h-3 w-3 text-primary-foreground" />}
              </div>
              <span className="text-sm">{option.label}</span>
            </div>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

function TechStackSection({ selection, setSelection }: { selection: string[]; setSelection: (selection: string[]) => void }) {
  const [isOpen, setIsOpen] = useState(true)

  const toggleOption = (value: string) => {
    if (selection.includes(value)) {
      setSelection(selection.filter((item) => item !== value))
    } else {
      setSelection([...selection, value])
    }
  }

  // Group tech stack by type
  const groupedTechStack = techStackOptions.reduce((acc, tech) => {
    if (!acc[tech.type]) {
      acc[tech.type] = []
    }
    acc[tech.type].push(tech)
    return acc
  }, {} as Record<string, typeof techStackOptions>)

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
      <CollapsibleTrigger asChild>
        <Button variant="ghost" className="flex w-full justify-between p-2 font-medium">
          Tech Stack
          <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "transform rotate-180")} />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="pt-2 pb-4 space-y-4">
          {Object.entries(groupedTechStack).map(([category, options]) => (
            <div key={category} className="space-y-2">
              <h4 className="text-xs font-medium text-muted-foreground px-2 uppercase tracking-wider">
                {category}
              </h4>
              {options.map((option) => (
                <div
                  key={option.value}
                  className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-muted cursor-pointer"
                  onClick={() => toggleOption(option.value)}
                >
                  <div
                    className={cn(
                      "h-4 w-4 rounded border flex items-center justify-center",
                      selection.includes(option.value) ? "bg-primary border-primary" : "border-muted-foreground",
                    )}
                  >
                    {selection.includes(option.value) && <Check className="h-3 w-3 text-primary-foreground" />}
                  </div>
                  <span className="text-sm">{option.label}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

function SDGGoalsSection({ selection, setSelection }: { selection: string[]; setSelection: (selection: string[]) => void }) {
  const [isOpen, setIsOpen] = useState(true)

  const toggleOption = (value: string) => {
    if (selection.includes(value)) {
      setSelection(selection.filter((item) => item !== value))
    } else {
      setSelection([...selection, value])
    }
  }

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
      <CollapsibleTrigger asChild>
        <Button variant="ghost" className="flex w-full justify-between p-2 font-medium">
          SDG Goals
          <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "transform rotate-180")} />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="pt-2 pb-4 space-y-2">
          {sdgGoals.map((goal) => (
            <div
              key={goal.name}
              className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-muted cursor-pointer"
              onClick={() => toggleOption(goal.name)}
            >
              <div
                className={cn(
                  "h-4 w-4 rounded border flex items-center justify-center",
                  selection.includes(goal.name) ? "bg-primary border-primary" : "border-muted-foreground",
                )}
              >
                {selection.includes(goal.name) && <Check className="h-3 w-3 text-primary-foreground" />}
              </div>
              <span className="text-sm">{goal.name.replace(/_/g, ' ')}</span>
            </div>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

export default function FilterSidebar() {
  const [selectedSDGs, setSelectedSDGs] = useState<string[]>([])
  const [selectedYears, setSelectedYears] = useState<string[]>([])
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([])
  const [selectedProjectTypes, setSelectedProjectTypes] = useState<string[]>([])
  const [selectedTechStack, setSelectedTechStack] = useState<string[]>([])

  const hasActiveFilters =
    selectedSDGs.length > 0 ||
    selectedYears.length > 0 ||
    selectedStatuses.length > 0 ||
    selectedProjectTypes.length > 0 ||
    selectedTechStack.length > 0

  const clearFilters = () => {
    setSelectedSDGs([])
    setSelectedYears([])
    setSelectedStatuses([])
    setSelectedProjectTypes([])
    setSelectedTechStack([])
  }

  // Generate years dynamically (last 4 years)
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 4 }, (_, i) => (currentYear - i).toString())

  return (
    <div className="bg-card p-4 rounded-xl border">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">Filters</h3>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters} className="text-xs h-7">
            Clear all
          </Button>
        )}
      </div>

      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 mb-4">
          {[
            ...selectedSDGs.map(sdg => sdg.replace(/_/g, ' ')),
            ...selectedYears,
            ...selectedStatuses,
            ...selectedProjectTypes,
            ...selectedTechStack
          ].map((filter) => (
            <Badge key={filter} variant="secondary" className="flex items-center gap-1">
              {filter}
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0 ml-1"
                onClick={() => {
                  if (selectedSDGs.includes(filter.replace(/ /g, '_'))) {
                    setSelectedSDGs(selectedSDGs.filter((sdg) => sdg !== filter.replace(/ /g, '_')))
                  } else if (selectedYears.includes(filter)) {
                    setSelectedYears(selectedYears.filter((y) => y !== filter))
                  } else if (selectedStatuses.includes(filter)) {
                    setSelectedStatuses(selectedStatuses.filter((s) => s !== filter))
                  } else if (selectedProjectTypes.includes(filter)) {
                    setSelectedProjectTypes(selectedProjectTypes.filter((pt) => pt !== filter))
                  } else if (selectedTechStack.includes(filter)) {
                    setSelectedTechStack(selectedTechStack.filter((ts) => ts !== filter))
                  }
                }}
              >
                <span className="sr-only">Remove</span>
                &times;
              </Button>
            </Badge>
          ))}
        </div>
      )}

      <div className="space-y-2 divide-y">
        <SDGGoalsSection 
          selection={selectedSDGs} 
          setSelection={setSelectedSDGs} 
        />
        <FilterSection 
          title="Project Type" 
          options={projectTypeOptions} 
          selection={selectedProjectTypes} 
          setSelection={setSelectedProjectTypes} 
        />
        <TechStackSection 
          selection={selectedTechStack} 
          setSelection={setSelectedTechStack} 
        />
        <FilterSection 
          title="Status" 
          options={projectStatusOptions} 
          selection={selectedStatuses} 
          setSelection={setSelectedStatuses} 
        />
        <FilterSection 
          title="Year" 
          options={years.map(year => ({ value: year, label: year }))} 
          selection={selectedYears} 
          setSelection={setSelectedYears} 
        />
      </div>
    </div>
  )
}