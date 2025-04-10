"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { FilterIcon, SearchIcon, XIcon } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

export function TeamFilter() {
  const [filters, setFilters] = useState<{
    search: string
    designation: string
  }>({
    search: "",
    designation: "",
  })

  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const handleApplyFilters = () => {
    const newFilters: string[] = []

    if (filters.search) {
      newFilters.push(`Search: ${filters.search}`)
    }

    if (filters.designation) {
      newFilters.push(`Role: ${filters.designation}`)
    }

    setActiveFilters(newFilters)
  }

  const clearFilter = (filter: string) => {
    setActiveFilters(activeFilters.filter((f) => f !== filter))

    if (filter.startsWith("Search:")) {
      setFilters({ ...filters, search: "" })
    } else if (filter.startsWith("Role:")) {
      setFilters({ ...filters, designation: "" })
    }
  }

  const clearAllFilters = () => {
    setActiveFilters([])
    setFilters({ search: "", designation: "" })
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <div className="relative">
          <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search members..."
            className="w-[200px] pl-8 rounded-full"
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleApplyFilters()
            }}
          />
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2 rounded-full">
              <FilterIcon className="h-3.5 w-3.5" />
              Filter
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[220px] p-4" align="start">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="designation">Role/Designation</Label>
                <Select
                  value={filters.designation}
                  onValueChange={(value) => setFilters({ ...filters, designation: value })}
                >
                  <SelectTrigger id="designation" className="rounded-md">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CEO">CEO</SelectItem>
                    <SelectItem value="CTO">CTO</SelectItem>
                    <SelectItem value="Designer">Designer</SelectItem>
                    <SelectItem value="Developer">Developer</SelectItem>
                    <SelectItem value="Product Manager">Product Manager</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button size="sm" onClick={handleApplyFilters}>
                Apply Filters
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2 items-center">
          {activeFilters.map((filter) => (
            <Badge key={filter} variant="secondary" className="rounded-full gap-1 pl-2">
              {filter}
              <Button
                variant="ghost"
                size="icon"
                className="h-5 w-5 p-0 ml-1 rounded-full hover:bg-muted-foreground/20"
                onClick={() => clearFilter(filter)}
              >
                <XIcon className="h-3 w-3" />
                <span className="sr-only">Remove {filter} filter</span>
              </Button>
            </Badge>
          ))}

          <Button
            variant="ghost"
            size="sm"
            className="h-7 text-xs rounded-full hover:bg-muted-foreground/20"
            onClick={clearAllFilters}
          >
            Clear all
          </Button>
        </div>
      )}
    </div>
  )
}
