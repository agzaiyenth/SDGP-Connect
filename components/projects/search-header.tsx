"use client"

import { Search } from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"

export default function SearchHeader() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Projects</h1>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search projects by name, domain, or technology..." className="pl-10" />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Sort by: Trending</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Trending</DropdownMenuItem>
            <DropdownMenuItem>Newest</DropdownMenuItem>
            <DropdownMenuItem>Startup Potential</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

