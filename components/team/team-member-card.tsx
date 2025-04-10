"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { LinkedinIcon, MoreHorizontalIcon, PencilIcon, TrashIcon } from "lucide-react"
import Link from "next/link"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import EditMemberDialog from "./edit-member-dialog"
import DeleteMemberDialog from "./delete-member-dialog"

interface TeamMember {
  id: string
  name: string
  designation: string
  linkedIn: string
  image: string
}

interface TeamMemberCardProps {
  member: TeamMember
}

export default function TeamMemberCard({ member }: TeamMemberCardProps) {
  const initials = member.name
    .split(" ")
    .map((name) => name[0])
    .join("")
    .toUpperCase()

  return (
    <Card className="overflow-hidden rounded-xl transition-all hover:shadow-lg hover:shadow-primary/5 group">
      <div className="relative">
        <div className="absolute top-3 right-3 z-10">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <MoreHorizontalIcon className="h-4 w-4" />
                <span className="sr-only">More options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <EditMemberDialog member={member}>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <PencilIcon className="h-4 w-4 mr-2" />
                  Edit
                </DropdownMenuItem>
              </EditMemberDialog>

              <DeleteMemberDialog memberId={member.id} memberName={member.name}>
                <DropdownMenuItem
                  onSelect={(e) => e.preventDefault()}
                  className="text-destructive focus:text-destructive"
                >
                  <TrashIcon className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DeleteMemberDialog>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="aspect-square relative">
          <Avatar className="h-full w-full rounded-none">
            <AvatarImage src={member.image} alt={member.name} className="object-cover" />
            <AvatarFallback className="text-4xl rounded-none">{initials}</AvatarFallback>
          </Avatar>
        </div>
      </div>
      <CardContent className="p-6">
        <h3 className="font-bold text-xl mb-1">{member.name}</h3>
        <p className="text-muted-foreground">{member.designation}</p>
      </CardContent>
      <CardFooter className="border-t p-4 bg-muted/10">
        <Link href={member.linkedIn} target="_blank" rel="noopener noreferrer" className="w-full">
          <Button
            variant="outline"
            className="w-full gap-2 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            <LinkedinIcon className="h-4 w-4" />
            Connect
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
