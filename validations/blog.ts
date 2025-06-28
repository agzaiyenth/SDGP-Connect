import { z } from "zod";
import { ProjectDomainEnum } from "@prisma/client";

// Blog Author Schema
export const blogAuthorSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name cannot exceed 100 characters"),
  email: z.string().email("Invalid email format"),
  avatarUrl: z.string().url("Invalid avatar URL").optional().or(z.literal("")),
  instagram: z.string().optional().or(z.literal("")),
  twitter: z.string().optional().or(z.literal("")),
  facebook: z.string().optional().or(z.literal("")),
  linkedin: z.string().optional().or(z.literal("")),
  medium: z.string().optional().or(z.literal("")),
  website: z.string().url("Invalid website URL").optional().or(z.literal("")),
});

// Blog Post Schema
export const blogPostSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title cannot exceed 200 characters"),
  excerpt: z.string().min(1, "Excerpt is required").max(500, "Excerpt cannot exceed 500 characters"),
  content: z.string().min(1, "Content is required"),
  imageUrl: z.string().url("Invalid image URL").optional().or(z.literal("")),
  publishedAt: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
  category: z.nativeEnum(ProjectDomainEnum, {
    errorMap: () => ({ message: "Please select a valid category" }),
  }),
  featured: z.boolean().default(false),
});

// Combined schema for full blog submission
export const blogSubmissionSchema = z.object({
  author: blogAuthorSchema,
  post: blogPostSchema,
});

// Author check schema
export const authorCheckSchema = z.object({
  email: z.string().email("Invalid email format"),
});

export type BlogAuthorSchema = z.infer<typeof blogAuthorSchema>;
export type BlogPostSchema = z.infer<typeof blogPostSchema>;
export type BlogSubmissionSchema = z.infer<typeof blogSubmissionSchema>;
export type AuthorCheckSchema = z.infer<typeof authorCheckSchema>;
