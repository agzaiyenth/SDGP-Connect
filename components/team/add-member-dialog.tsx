"use client"

import type React from "react"

import { useState } from "react"
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

interface AddMemberDialogProps {
  children: React.ReactNode
}

export default function AddMemberDialog({ children }: AddMemberDialogProps) {
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast.success("Team member added", {
      description: "The team member has been successfully added.",
    })

    setIsSubmitting(false)
    setOpen(false)
    setPreviewImage(null)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px] rounded-xl">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add Team Member</DialogTitle>
            <DialogDescription>Fill in the details to add a new team member.</DialogDescription>
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
              <Input id="name" placeholder="John Doe" className="rounded-md" required />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="designation">Designation</Label>
              <Input id="designation" placeholder="Software Engineer" className="rounded-md" required />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="linkedin" className="flex items-center gap-2">
                <LinkedinIcon className="h-4 w-4" /> LinkedIn URL
              </Label>
              <Input
                id="linkedin"
                type="url"
                placeholder="https://linkedin.com/in/username"
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
              {isSubmitting ? "Adding..." : "Add Member"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
