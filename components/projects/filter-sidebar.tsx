"use client"

import { useState } from "react"
import { Check, ChevronDown } from "lucide-react"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible"
import { cn } from "../../lib/utils"

import {
  projectStatusOptions,
  projectTypeOptions,
  projectDomainsOptions,
  sdgGoals,
  techStackOptions
} from "../../types/project/mapping"

type Option = { value: string; label: string; icon?: React.ComponentType<React.SVGProps<SVGSVGElement>> }

type GenericSectionProps = {
  title: string
  options: Option[]
  selection: string[]
  setSelection: (selection: string[]) => void
  showIcons?: boolean
}

function GenericFilterSection({
  title,
  options,
  selection,
  setSelection,
  showIcons = false
}: GenericSectionProps) {
  const [isOpen, setIsOpen] = useState(true)
  const [showAll, setShowAll] = useState(false)

  const initialOptionsCount = 5
  const displayedOptions = showAll ? options : options.slice(0, initialOptionsCount)
  const hasMore = options.length > initialOptionsCount

  const toggleOption = (value: string) => {
    setSelection(
      selection.includes(value)
        ? selection.filter((item) => item !== value)
        : [...selection, value]
    )
  }

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
      <CollapsibleTrigger asChild>
        <Button variant="ghost" className="flex w-full justify-between p-2 font-medium">
          {title}
          <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="pt-2 pb-4 space-y-2">
          {displayedOptions.map((option) => {
            const Icon = option.icon
            return (
              <div
                key={option.value}
                className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-muted cursor-pointer"
                onClick={() => toggleOption(option.value)}
              >
                <div
                  className={cn(
                    "h-4 w-4 rounded border flex items-center justify-center",
                    selection.includes(option.value) ? "bg-primary border-primary" : "border-muted-foreground"
                  )}
                >
                  {selection.includes(option.value) && <Check className="h-3 w-3 text-primary-foreground" />}
                </div>
                {showIcons && Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
                <span className="text-sm">{option.label}</span>
              </div>
            )
          })}

          {hasMore && (
            <Button
              variant="ghost"
              size="sm"
              className="w-full text-xs text-muted-foreground mt-1"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? "Show less" : `Show ${options.length - initialOptionsCount} more`}
            </Button>
          )}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

function TechStackSection({
  selection,
  setSelection
}: {
  selection: string[]
  setSelection: (selection: string[]) => void
}) {
  const [isOpen, setIsOpen] = useState(true)
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({})

  const toggleOption = (value: string) => {
    setSelection(
      selection.includes(value)
        ? selection.filter((item) => item !== value)
        : [...selection, value]
    )
  }

  const grouped = techStackOptions.reduce((acc, tech) => {
    acc[tech.type] = acc[tech.type] || []
    acc[tech.type].push(tech)
    return acc
  }, {} as Record<string, typeof techStackOptions>)

  const initialOptionsCount = 5

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
      <CollapsibleTrigger asChild>
        <Button variant="ghost" className="flex w-full justify-between p-2 font-medium">
          Tech Stack
          <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="pt-2 pb-4 space-y-4">
          {Object.entries(grouped).map(([category, options]) => {
            const isExpanded = expandedCategories[category] || false
            const displayed = isExpanded ? options : options.slice(0, initialOptionsCount)
            const hasMore = options.length > initialOptionsCount

            return (
              <div key={category} className="space-y-2">
                <h4 className="text-xs font-medium text-muted-foreground px-2 uppercase tracking-wider">{category}</h4>
                {displayed.map((option) => (
                  <div
                    key={option.value}
                    className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-muted cursor-pointer"
                    onClick={() => toggleOption(option.value)}
                  >
                    <div
                      className={cn(
                        "h-4 w-4 rounded border flex items-center justify-center",
                        selection.includes(option.value) ? "bg-primary border-primary" : "border-muted-foreground"
                      )}
                    >
                      {selection.includes(option.value) && <Check className="h-3 w-3 text-primary-foreground" />}
                    </div>
                    {option.icon && <option.icon className="h-4 w-4 text-muted-foreground" />}
                    <span className="text-sm">{option.label}</span>
                  </div>
                ))}
                {hasMore && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full text-xs text-muted-foreground mt-1"
                    onClick={() =>
                      setExpandedCategories((prev) => ({
                        ...prev,
                        [category]: !isExpanded
                      }))
                    }
                  >
                    {isExpanded ? "Show less" : `Show ${options.length - initialOptionsCount} more`}
                  </Button>
                )}
              </div>
            )
          })}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

export default function FilterSidebar() {
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([])
  const [selectedYears, setSelectedYears] = useState<string[]>([])
  const [selectedProjectTypes, setSelectedProjectTypes] = useState<string[]>([])
  const [selectedDomains, setSelectedDomains] = useState<string[]>([])
  const [selectedSDGs, setSelectedSDGs] = useState<string[]>([])
  const [selectedTechStack, setSelectedTechStack] = useState<string[]>([])

  const hasActiveFilters = [
    selectedStatuses,
    selectedYears,
    selectedProjectTypes,
    selectedDomains,
    selectedSDGs,
    selectedTechStack
  ].some((arr) => arr.length > 0)

  const clearFilters = () => {
    setSelectedStatuses([])
    setSelectedYears([])
    setSelectedProjectTypes([])
    setSelectedDomains([])
    setSelectedSDGs([])
    setSelectedTechStack([])
  }

  const currentYear = new Date().getFullYear()
  const yearOptions = Array.from({ length: 4 }, (_, i) => {
    const y = (currentYear - i).toString()
    return { value: y, label: y }
  })

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
            ...selectedStatuses,
            ...selectedYears,
            ...selectedProjectTypes,
            ...selectedDomains,
            ...selectedSDGs.map((sdg) => sdg.replace(/_/g, " ")),
            ...selectedTechStack
          ].map((filter) => (
            <Badge key={filter} variant="secondary" className="flex items-center gap-1">
              {filter}
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0 ml-1"
                onClick={() => {
                  setSelectedStatuses((prev) => prev.filter((f) => f !== filter))
                  setSelectedYears((prev) => prev.filter((f) => f !== filter))
                  setSelectedProjectTypes((prev) => prev.filter((f) => f !== filter))
                  setSelectedDomains((prev) => prev.filter((f) => f !== filter))
                  setSelectedSDGs((prev) => prev.filter((f) => f.replace(/_/g, " ") !== filter))
                  setSelectedTechStack((prev) => prev.filter((f) => f !== filter))
                }}
              >
                &times;
              </Button>
            </Badge>
          ))}
        </div>
      )}

      <div className="space-y-2 divide-y">
        <GenericFilterSection
          title="Project Status"
          options={projectStatusOptions}
          selection={selectedStatuses}
          setSelection={setSelectedStatuses}
        />
        <GenericFilterSection
          title="Year"
          options={yearOptions}
          selection={selectedYears}
          setSelection={setSelectedYears}
        />
        <GenericFilterSection
          title="Project Type"
          options={projectTypeOptions}
          selection={selectedProjectTypes}
          setSelection={setSelectedProjectTypes}
          showIcons
        />
        <GenericFilterSection
          title="Project Domain"
          options={projectDomainsOptions}
          selection={selectedDomains}
          setSelection={setSelectedDomains}
          showIcons
        />
        <GenericFilterSection
          title="SDG Goals"
          options={sdgGoals.map((goal) => ({ value: goal.name, label: goal.name.replace(/_/g, " ") }))}
          selection={selectedSDGs}
          setSelection={setSelectedSDGs}
        />
        <TechStackSection
          selection={selectedTechStack}
          setSelection={setSelectedTechStack}

        />
      </div>
    </div>
  )
}
