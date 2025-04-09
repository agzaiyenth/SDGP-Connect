"use client";

import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import { Instagram, Linkedin, Facebook, Mail } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  const formSchema = z.object({
    name: z
      .string()
      .min(2, { message: "Name should have at least 2 characters" })
      .max(50, { message: "Name should have maximum 50 characters" }),
    email: z.string().email(),
    subject: z
      .string()
      .min(2, { message: "Subject should have at least 2 characters" })
      .max(50, { message: "Subject should have maximum 50 characters" }),
    message: z
      .string()
      .min(10, { message: "Message should have at least 10 characters" })
      .max(500, { message: "Message should have maximum 500 characters" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const contactMethods = [
    {
      name: "Instagram",
      icon: Instagram,
      description: "Follow us @lexi.platform",
      color: "text-pink-600",
      url: "https://www.instagram.com/lexi.platform/"
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      description: "Connect with us on LinkedIn",
      color: "text-blue-600",
      url: "https://www.linkedin.com/company/105048505/"
    },
    {
      name: "Facebook",
      icon: Facebook,
      description: "Like our Facebook page",
      color: "text-blue-800",
      url: "https://www.facebook.com/profile.php?id=61569360264610"
    },
    {
      name: "Email",
      icon: Mail,
      description: "Mail us at info@lexi.lk",
      color: "text-red-600",
      url: "mailto:info@lexi.lk"
    },
  ];

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <main className="min-h-screen w-full px-4">
    {/* Larger centered title with top spacing */}
    <div className="pt-12 pb-12 w-full text-center"> 
      <h1 className="text-4xl font-bold">Contact Us</h1>
    </div>  

      {/* Full-width form container */}
      <div className="w-full max-w-6xl mx-auto p-8 bg-muted rounded-lg shadow-md mb-12">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="font-semibold">Name</FormLabel>
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
                  <FormItem className="flex-1">
                    <FormLabel className="font-semibold">Email</FormLabel>
                    <FormControl>
                      <Input placeholder="example@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Subject</FormLabel>
                  <FormControl>
                    <Input placeholder="Your subject" {...field} />
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
                  <FormLabel className="font-semibold">Message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Your message"
                      className="resize-none min-h-[150px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button type="submit" className="px-6">
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </div>

      {/* "Connect With Us" section header */}
      <h2 className="text-2xl font-bold text-center mb-6">Connect With Us</h2>
      
      {/* Contact methods with links and hover effects */}
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {contactMethods.map((method, index) => (
          <Link 
            key={index}
            href={method.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:-translate-y-2 transition-transform duration-300"
          >
            <div className="flex flex-col items-center text-center p-6 rounded-xl bg-muted hover:shadow-lg h-full">
              <div className="rounded-full bg-primary/10 p-4 mb-4">
                <method.icon className={`h-8 w-8 ${method.color}`} />
              </div>
              <h3 className="text-xl font-semibold mb-2">{method.name}</h3>
              <p className="text-sm text-muted-foreground">
                {method.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}