"use client"

import { Search, SlidersHorizontal } from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"

interface SearchHeaderProps {
  toggleFilters?: () => void;
}

export default function SearchHeader({ toggleFilters }: SearchHeaderProps) {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Projects</h1>

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search projects..." className="pl-10" />
        </div>
        
        <Button 
          variant="outline" 
          className="md:hidden flex-shrink-0"
          onClick={toggleFilters}
        >
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </div>
    </div>
  )
}

