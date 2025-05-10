"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useToast } from "@/hooks/contact/use-toast"
import { PhoneCall, Loader2, CheckCircle2 } from "lucide-react"
import Link from "next/link"

const formSchema = z.object({
  fullName: z.string().min(2, { message: "Please enter your name." }),
  email: z.string().email({ message: "Enter a valid email address." }),
  company: z.string().optional(),
  interest: z.string().min(5, { message: "Let us know your interest." }),
  message: z.string().min(20, { message: "Please describe your inquiry." }),
})

type FormData = z.infer<typeof formSchema>

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const { toast } = useToast()

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      company: "",
      interest: "",
      message: "",
    },
  })

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    console.log(data)
    setIsSubmitting(false)
    setIsSuccess(true)
    toast({
      title: "Submission Received!",
      description: "Thanks for reaching out. We'll be in touch soon.",
    })
  }

  return (
    <section className="relative min-h-screen overflow-x-hidden overflow-y-auto px-auto px-10 bg-[#0a0a0a] text-white">
      <div className="absolute inset-0 bg-[#0a0a0a] z-0" />
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 container">
        <div className="space-y-6 mt-32 md:mt-12">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            Let’s Connect & Collaborate
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl">
            Are you an investor, collaborator, or just curious about our module?
            Whether you're exploring partnerships, investment opportunities, or talent discovery, we’re here to talk.
          </p>
          <Button size="lg" className="gap-3" asChild>
            <a href="tel:+947777810612">
              <PhoneCall className="w-5 h-5" /> Call Now
            </a>
          </Button>
        </div>

        <Card className="w-full max-w-2xl mx-auto bg-background">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardHeader>
                <h3 className="text-2xl font-semibold">Get in Touch</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="info@psycodelabs.lk" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company / Organization</FormLabel>
                      <FormControl>
                        <Input placeholder="Psycode Lab's" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="interest"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Interest</FormLabel>
                      <FormControl>
                        <Input placeholder="Investment, collaboration, talent acquisition..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Tell us more about how you'd like to collaborate..." rows={5} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter className="flex flex-col items-start space-y-3 pt-4">
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </Button>
                {isSuccess && (
                  <div className="flex items-center gap-2 text-green-500 text-sm">
                    <CheckCircle2 className="w-4 h-4" /> Thank you for reaching out!
                  </div>
                )}
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>
    </section>
  )
}
