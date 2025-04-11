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
  Laptop,
  PenTool,
  Zap,
} from "lucide-react"
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"
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
      institution: "",
      projectTitle: "",
      projectCategory: "",
      projectDescription: "",
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
    <section className="relative py-24 md:py-32 bg-black text-white">
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=500&width=1000')] bg-fixed bg-center opacity-5"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black/90"></div>

      {/* Ocean blue animated gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-[10px] opacity-10 blur-3xl">
          <div className="absolute top-0 -left-40 h-[500px] w-[800px] rounded-full bg-gradient-to-r from-[#0a192f] to-[#0ea5e9] animate-pulse [animation-duration:8s]"></div>
          <div className="absolute bottom-0 -right-40 h-[500px] w-[800px] rounded-full bg-gradient-to-r from-[#0ea5e9] to-[#0a192f] animate-pulse [animation-duration:10s] [animation-delay:1s]"></div>
        </div>
      </div>

      <div className="container grid w-full grid-cols-1 gap-x-8 lg:gap-x-16 overflow-hidden lg:grid-cols-2 relative z-10">
        <div className="w-full pb-10 md:pb-0 flex flex-col">
          <div className="space-y-6 mb-8">
            <div className="inline-flex items-center rounded-full border border-[#0ea5e9]/20 bg-[#0ea5e9]/10 px-3 py-1 text-sm font-medium text-[#0ea5e9]">
              SDGP Connect
            </div>
            <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">Showcase Your Innovation</h1>
            <div className="text-gray-400 md:text-base lg:text-lg lg:leading-7">
              Submit your project to be featured on our platform. SDGP Connect highlights exceptional student projects,
              connecting innovative minds with industry professionals and the academic community.
            </div>
          </div>

          {/* Website Creation Card - This is the main card on the left */}
          <Card className="border-gray-800 bg-gray-900/40 backdrop-blur-sm shadow-[0_0_35px_-15px_rgba(14,165,233,0.3)] mb-8 flex-grow">
            <CardHeader className="pb-4">
              <h3 className="text-2xl font-semibold text-white flex items-center">
                <Laptop className="mr-2 h-6 w-6 text-[#0ea5e9]" />
                Need a Similar Website?
              </h3>
              <p className="text-gray-400">Let us create a custom platform for your institution or organization</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-black/30 p-4 rounded-lg border border-gray-800 flex flex-col">
                  <div className="flex items-center mb-3">
                    <div className="flex size-8 items-center justify-center rounded-full bg-[#0ea5e9]/10 mr-3">
                      <PenTool className="size-4 text-[#0ea5e9]" />
                    </div>
                    <h4 className="font-medium">Custom Design</h4>
                  </div>
                  <p className="text-sm text-gray-400">
                    Tailored to match your brand identity and specific requirements
                  </p>
                </div>

                <div className="bg-black/30 p-4 rounded-lg border border-gray-800 flex flex-col">
                  <div className="flex items-center mb-3">
                    <div className="flex size-8 items-center justify-center rounded-full bg-[#0ea5e9]/10 mr-3">
                      <Zap className="size-4 text-[#0ea5e9]" />
                    </div>
                    <h4 className="font-medium">Fast Development</h4>
                  </div>
                  <p className="text-sm text-gray-400">Quick turnaround with modern technologies and best practices</p>
                </div>

                <div className="bg-black/30 p-4 rounded-lg border border-gray-800 flex flex-col">
                  <div className="flex items-center mb-3">
                    <div className="flex size-8 items-center justify-center rounded-full bg-[#0ea5e9]/10 mr-3">
                      <Code className="size-4 text-[#0ea5e9]" />
                    </div>
                    <h4 className="font-medium">Project Showcase</h4>
                  </div>
                  <p className="text-sm text-gray-400">Feature student projects with advanced filtering and search</p>
                </div>

                <div className="bg-black/30 p-4 rounded-lg border border-gray-800 flex flex-col">
                  <div className="flex items-center mb-3">
                    <div className="flex size-8 items-center justify-center rounded-full bg-[#0ea5e9]/10 mr-3">
                      <Globe className="size-4 text-[#0ea5e9]" />
                    </div>
                    <h4 className="font-medium">Fully Responsive</h4>
                  </div>
                  <p className="text-sm text-gray-400">Works perfectly on all devices from mobile to desktop</p>
                </div>
              </div>

              <div className="pt-4">
                <Link href="https://example.com/contact" target="_blank">
                  <Button className="w-full bg-[#0ea5e9] hover:bg-[#0ea5e9]/90 text-white h-12 text-base">
                    Get Your Custom Website <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <p className="text-center text-sm text-gray-500 mt-3">
                  Contact us today for a free consultation and quote
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex w-full justify-center">
          <Card className="relative flex w-full min-w-80 max-w-[30rem] flex-col items-center overflow-visible border-gray-800 bg-gray-900/80 shadow-[0_0_45px_-15px_rgba(14,165,233,0.3)] backdrop-blur-sm md:min-w-96">
            <div className="absolute -top-12 flex h-24 w-24 items-center justify-center rounded-full bg-black border-4 border-gray-800 shadow-[0_0_30px_-5px_rgba(14,165,233,0.5)]">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#0ea5e9]/20">
                <Code className="h-8 w-8 text-[#0ea5e9]" />
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
                  <div className="flex size-16 items-center justify-center rounded-full bg-[#0ea5e9]/10">
                    <CheckCircle2 className="size-8 text-[#0ea5e9]" />
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
                                    placeholder="SD12345"
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
                                    placeholder="you@example.com"
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
                        name="institution"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Institution</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <span className="absolute left-3 top-2.5 text-gray-400">
                                  <Globe className="size-4" />
                                </span>
                                <Input
                                  placeholder="Your University"
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
                        name="projectTitle"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Project Title</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter your project title"
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
                        name="projectCategory"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Project Category</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="bg-gray-800 border-gray-700">
                                  <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-gray-800 border-gray-700">
                                <SelectItem value="web">Web Development</SelectItem>
                                <SelectItem value="mobile">Mobile App</SelectItem>
                                <SelectItem value="ai">AI/Machine Learning</SelectItem>
                                <SelectItem value="iot">IoT</SelectItem>
                                <SelectItem value="game">Game Development</SelectItem>
                                <SelectItem value="blockchain">Blockchain</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="projectDescription"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Project Description</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Briefly describe your project, its purpose, and key features..."
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
                        name="githubLink"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              GitHub Repository <span className="text-gray-400">(Optional)</span>
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <span className="absolute left-3 top-2.5 text-gray-400">
                                  <Github className="size-4" />
                                </span>
                                <Input
                                  placeholder="https://github.com/username/repo"
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
                      <Alert className="mb-4 border-[#0ea5e9]/10 bg-gray-800">
                        <CheckCircle2 className="size-4 text-[#0ea5e9]" />
                        <AlertTitle className="ml-2 text-[#0ea5e9]">Showcase Promise</AlertTitle>
                        <AlertDescription className="ml-6 text-sm text-gray-400">
                          Selected projects will be featured on our platform and may receive opportunities for further
                          development and recognition.
                        </AlertDescription>
                      </Alert>

                      <Button
                        type="submit"
                        className="w-full bg-[#0ea5e9] hover:bg-[#0ea5e9]/90 text-white"
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
                        <a href="#" className="text-[#0ea5e9] hover:underline">
                          terms of service
                        </a>{" "}
                        and{" "}
                        <a href="#" className="text-[#0ea5e9] hover:underline">
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
