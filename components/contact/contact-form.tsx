"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowRight,
  Code,
  Mail,
  User,
  GraduationCap,
  CheckCircle2,
  Loader2,
  Github,
  ExternalLink,
  Globe,
} from "lucide-react"
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useToast } from "@/hooks/contact/use-toast"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"

// Define the schema for form validation
const formSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" })
    .regex(/^[a-zA-Z\s]*$/, {
      message: "Name can only contain letters and spaces",
    }),
  studentId: z.string().min(5, { message: "Student ID is required" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  institution: z.string().min(1, { message: "Institution name is required" }),
  projectTitle: z.string().min(3, { message: "Project title is required" }),
  projectCategory: z.string().min(1, { message: "Please select a project category" }),
  projectDescription: z
    .string()
    .min(20, { message: "Please provide a brief description of your project (min 20 characters)" }),
  githubLink: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal("")),
  agreeTerms: z.boolean().refine((val) => val === true, { message: "You must agree to the terms and conditions" }),
})

// Define the type for the form data
type FormData = z.infer<typeof formSchema>

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const { toast } = useToast()

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      studentId: "",
      email: "",
      projectTitle: "",
      message: "",
      githubLink: "",
      agreeTerms: false,
    },
  })

  // Apply the FormData type to the onSubmit function
  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    console.log(data)
    setIsSubmitting(false)
    setIsSuccess(true)

    toast({
      title: "Project Submission Received!",
      description: "Your project has been submitted for showcase consideration.",
      variant: "default",
    })
  }

  const resetForm = () => {
    form.reset()
    setIsSuccess(false)
  }

  return (
    <section className="relative py-24 md:py-32 pl-32 bg-[#0c0a09] text-white">
      <div className="absolute inset-0 bg-fixed bg-center opacity-5"></div>
      <div className="absolute inset-0 bg-[#0c0a09]"></div>

      {/* Dark blue animated gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-[10px] opacity-10 blur-3xl">
          <div className="absolute top-0 -left-40 h-[500px] w-[800px] rounded-full bg-gradient-to-r from-[#0a192f] to-[#1e3a8a] animate-pulse [animation-duration:8s]"></div>
          <div className="absolute bottom-0 -right-40 h-[500px] w-[800px] rounded-full bg-gradient-to-r from-[#1e3a8a] to-[#0a192f] animate-pulse [animation-duration:10s] [animation-delay:1s]"></div>
        </div>
      </div>

      <div className="container grid w-full grid-cols-1 gap-x-8 lg:gap-x-16 overflow-hidden lg:grid-cols-2 relative z-10">
        <div className="w-full pb-10 md:pb-0 flex flex-col">
          <div className="space-y-6 mb-8">
            <div className="inline-flex items-center rounded-full border border-[#1e3a8a]/20 bg-[#1e3a8a]/10 px-3 py-1 text-sm font-medium text-[#3b82f6]">
              SDGP Connect
            </div>
            <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">Showcase Your Innovation</h1>
            <div className="text-gray-400 md:text-base lg:text-lg lg:leading-7">
              Submit your project to be featured on our platform. SDGP Connect highlights exceptional student projects,
              connecting innovative minds with industry professionals and the academic community.
            </div>
          </div>

          
          
          <div className="mb-8 space-y-4">
              <p className="text-lg font-semibold">Why Showcase Your Project?</p>
              <div className="grid gap-3">
                <div className="flex items-center space-x-3">
                  <div className="flex size-6 items-center justify-center rounded-full bg-[#1e3a8a]/10">
                    <CheckCircle2 className="size-3.5 text-[#3b82f6]" />
                  </div>
                  <p className="text-sm">Gain visibility among industry professionals</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex size-6 items-center justify-center rounded-full bg-[#1e3a8a]/10">
                    <CheckCircle2 className="size-3.5 text-[#3b82f6]" />
                  </div>
                  <p className="text-sm">Connect with potential employers and collaborators</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex size-6 items-center justify-center rounded-full bg-[#1e3a8a]/10">
                    <CheckCircle2 className="size-3.5 text-[#3b82f6]" />
                  </div>
                  <p className="text-sm">Receive feedback from experts in your field</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex size-6 items-center justify-center rounded-full bg-[#1e3a8a]/10">
                    <CheckCircle2 className="size-3.5 text-[#3b82f6]" />
                  </div>
                  <p className="text-sm">Build your professional portfolio</p>
                </div>
              </div>
            </div>
          <div className="space-y-4 flex-grow">
            <p className="text-lg font-semibold">Featured Project Categories:</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 bg-gray-900/50 p-3 rounded-lg border border-gray-800">
                <Code className="size-5 text-[#3b82f6]" />
                <span>Software Development</span>
              </div>
              <div className="flex items-center space-x-3 bg-gray-900/50 p-3 rounded-lg border border-gray-800">
                <Github className="size-5 text-[#3b82f6]" />
                <span>Open Source Projects</span>
              </div>
            </div>

            
            {/* Smaller Website Creation Card */}
         
            <Card className="border-gray-800 bg-gray-900/40 backdrop-blur-sm shadow-[0_0_25px_-15px_rgba(30,58,138,0.3)]">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex size-8 items-center justify-center rounded-full bg-[#1e3a8a]/10">
                    <Code className="size-4 text-[#3b82f6]" />
                  </div>
                  <h3 className="text-lg font-medium">Need a Similar Website?</h3>
                </div>
                <p className="text-sm text-gray-400 mb-4">
                  We can create custom project showcase platforms for educational institutions.
                </p>
                <Link href="https://psycodelabs.lk" target="_blank">
                  <Button className="w-full bg-[#1e3a8a] hover:bg-[#1e3a8a]/90 text-white">
                    Learn More <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex w-full justify-center">
          <Card className="relative flex w-full min-w-80 max-w-[30rem] flex-col items-center overflow-visible border-gray-800 bg-gray-900/80 shadow-[0_0_45px_-15px_rgba(30,58,138,0.3)] backdrop-blur-sm md:min-w-96">
            <div className="absolute -top-12 flex h-24 w-24 items-center justify-center rounded-full bg-black border-4 border-gray-800 shadow-[0_0_30px_-5px_rgba(30,58,138,0.5)]">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#1e3a8a]/20">
                <Code className="h-8 w-8 text-[#3b82f6]" />
              </div>
            </div>
            <CardHeader className="pb-2 pt-16">
              <div className="flex flex-col items-center space-y-1.5 text-center">
                <h2 className="text-2xl font-semibold">SDGP Connect</h2>
                <p className="text-sm text-gray-400">Submit your project for showcase</p>
              </div>
            </CardHeader>
            <CardContent className="w-full p-6">
              {isSuccess ? (
                <div className="flex flex-col items-center justify-center space-y-6 py-10 text-center">
                  <div className="flex size-16 items-center justify-center rounded-full bg-[#1e3a8a]/10">
                    <CheckCircle2 className="size-8 text-[#3b82f6]" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold">Thank You!</h3>
                    <p className="text-gray-400">
                      Your project has been submitted successfully. Our team will review your submission and get back to
                      you within 5 business days.
                    </p>
                  </div>
                  <Button onClick={resetForm} className="mt-4" variant="outline">
                    Submit Another Project
                  </Button>
                </div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                    <div className="grid gap-5">
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full name</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <span className="absolute left-3 top-2.5 text-gray-400">
                                  <User className="size-4" />
                                </span>
                                <Input
                                  placeholder="John Doe"
                                  {...field}
                                  className="pl-10 bg-gray-800 border-gray-700"
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <FormField
                          control={form.control}
                          name="studentId"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Student ID</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <span className="absolute left-3 top-2.5 text-gray-400">
                                    <GraduationCap className="size-4" />
                                  </span>
                                  <Input
                                    placeholder="20230746"
                                    {...field}
                                    className="pl-10 bg-gray-800 border-gray-700"
                                  />
                                </div>
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
                              <FormLabel>Email address</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <span className="absolute left-3 top-2.5 text-gray-400">
                                    <Mail className="size-4" />
                                  </span>
                                  <Input
                                    type="email"
                                    placeholder="yourname@iit.ac.lk"
                                    {...field}
                                    className="pl-10 bg-gray-800 border-gray-700"
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      

                      <FormField
                        control={form.control}
                        name="projectTitle"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Project Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="LEXi"
                                {...field}
                                className="bg-gray-800 border-gray-700"
                              />
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
                            <FormLabel>Project Description</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Briefly describe your issue/ Reason to contact us..."
                                className="min-h-24 resize-none bg-gray-800 border-gray-700"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />


                      <FormField
                        control={form.control}
                        name="agreeTerms"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-gray-700 p-4 bg-gray-800/50">
                            <FormControl>
                              <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>I agree to the terms and conditions of SDGP Connect</FormLabel>
                              <FormMessage />
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>

                    <CardFooter className="flex w-full flex-col justify-end space-y-3 p-0 pt-2">
                      

                      <Button
                        type="submit"
                        className="w-full bg-[#1e3a8a] hover:bg-[#1e3a8a]/90 text-white"
                        size="lg"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 size-4 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            Submit Project <ArrowRight className="ml-2 size-4" />
                          </>
                        )}
                      </Button>
                      <div className="text-xs text-gray-400">
                        By submitting this form, you agree to our{" "}
                        <a href="#" className="text-[#3b82f6] hover:underline">
                          terms of service
                        </a>{" "}
                        and{" "}
                        <a href="#" className="text-[#3b82f6] hover:underline">
                          privacy policy
                        </a>
                        .
                      </div>
                    </CardFooter>
                  </form>
                </Form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
