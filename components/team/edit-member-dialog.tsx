"use client"

import type React from "react"
import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LinkedinIcon, UploadIcon } from "lucide-react"
import { toast } from "sonner"

interface TeamMember {
  id: string
  name: string
  designation: string
  linkedIn: string
  image: string
}

interface EditMemberDialogProps {
  member: TeamMember
  children: React.ReactNode
  onUpdate?: (member: TeamMember) => void
}

export default function EditMemberDialog({ member, children, onUpdate }: EditMemberDialogProps) {
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<TeamMember>(member)
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  useEffect(() => {
    if (open) {
      setFormData(member)
      setPreviewImage(member.image)
    }
  }, [open, member])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const imageUrl = reader.result as string
        setPreviewImage(imageUrl)
        setFormData({ ...formData, image: imageUrl })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData({ ...formData, [id]: value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (onUpdate) {
      onUpdate(formData)
    }

    toast.success("Team member updated", {
      description: "The team member has been successfully updated.",
    })

    setIsSubmitting(false)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px] rounded-xl">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Team Member</DialogTitle>
            <DialogDescription>Update the details of this team member.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-6">
            <div className="flex justify-center">
              <div className="relative">
                <Avatar className="h-24 w-24 border-2 border-muted">
                  <AvatarImage src={previewImage || ""} />
                  <AvatarFallback className="bg-primary/10 text-xl">
                    {previewImage ? "" : <UploadIcon className="h-8 w-8 text-muted-foreground" />}
                  </AvatarFallback>
                </Avatar>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={handleImageChange}
                />
              </div>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={formData.name} onChange={handleChange} className="rounded-md" required />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="designation">Designation</Label>
              <Input
                id="designation"
                value={formData.designation}
                onChange={handleChange}
                className="rounded-md"
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="linkedIn" className="flex items-center gap-2">
                <LinkedinIcon className="h-4 w-4" /> LinkedIn URL
              </Label>
              <Input
                id="linkedIn"
                type="url"
                value={formData.linkedIn}
                onChange={handleChange}
                className="rounded-md"
                required
              />
            </div>
          </div>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="rounded-full">
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="rounded-full">
              {isSubmitting ? "Updating..." : "Update Member"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
