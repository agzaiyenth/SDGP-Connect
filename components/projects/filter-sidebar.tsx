"use client"

import { useState } from "react"
import { Check, ChevronDown } from "lucide-react"
import { cn } from "../../lib/utils"
import { Button } from "../ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible"
import { Badge } from "../ui/badge"

const domains = ["Healthcare", "Education", "Environment", "Agriculture", "Financial Inclusion", "Smart Cities"]
const years = ["2023", "2022", "2021", "2020"]
const statuses = ["Completed", "In Progress", "Prototype", "Concept"]
const tags = ["AI/ML", "Mobile", "Web", "IoT", "Blockchain", "AR/VR", "Data Analytics"]

type FilterSection = {
  title: string
  options: string[]
  selection: string[]
  setSelection: (selection: string[]) => void
}

function FilterSection({ title, options, selection, setSelection }: FilterSection) {
  const [isOpen, setIsOpen] = useState(true)

  const toggleOption = (option: string) => {
    if (selection.includes(option)) {
      setSelection(selection.filter((item) => item !== option))
    } else {
      setSelection([...selection, option])
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
            <label
              key={option}
              className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-muted cursor-pointer"
            >
              <div
                className={cn(
                  "h-4 w-4 rounded border flex items-center justify-center",
                  selection.includes(option) ? "bg-primary border-primary" : "border-muted-foreground",
                )}
              >
                {selection.includes(option) && <Check className="h-3 w-3 text-primary-foreground" />}
              </div>
              <span className="text-sm">{option}</span>
            </label>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

export default function FilterSidebar() {
  const [selectedDomains, setSelectedDomains] = useState<string[]>([])
  const [selectedYears, setSelectedYears] = useState<string[]>([])
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([])
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const hasActiveFilters =
    selectedDomains.length > 0 || selectedYears.length > 0 || selectedStatuses.length > 0 || selectedTags.length > 0

  const clearFilters = () => {
    setSelectedDomains([])
    setSelectedYears([])
    setSelectedStatuses([])
    setSelectedTags([])
  }

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
          {[...selectedDomains, ...selectedYears, ...selectedStatuses, ...selectedTags].map((filter) => (
            <Badge key={filter} variant="secondary" className="flex items-center gap-1">
              {filter}
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0 ml-1"
                onClick={() => {
                  if (selectedDomains.includes(filter)) {
                    setSelectedDomains(selectedDomains.filter((d) => d !== filter))
                  } else if (selectedYears.includes(filter)) {
                    setSelectedYears(selectedYears.filter((y) => y !== filter))
                  } else if (selectedStatuses.includes(filter)) {
                    setSelectedStatuses(selectedStatuses.filter((s) => s !== filter))
                  } else if (selectedTags.includes(filter)) {
                    setSelectedTags(selectedTags.filter((t) => t !== filter))
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
        <FilterSection title="Domain" options={domains} selection={selectedDomains} setSelection={setSelectedDomains} />
        <FilterSection title="Year" options={years} selection={selectedYears} setSelection={setSelectedYears} />
        <FilterSection
          title="Status"
          options={statuses}
          selection={selectedStatuses}
          setSelection={setSelectedStatuses}
        />
        <FilterSection title="Tags" options={tags} selection={selectedTags} setSelection={setSelectedTags} />
      </div>
    </div>
  )
}

