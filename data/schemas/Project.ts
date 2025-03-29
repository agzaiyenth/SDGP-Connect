import { z } from "zod";

const externalLinksSchema = z.object({
  website: z.string().url().or(z.string().length(0)).optional(),
  instagram: z.string().url().or(z.string().length(0)).optional(),
  facebook: z.string().url().or(z.string().length(0)).optional(),
  youtube: z.string().url().or(z.string().length(0)).optional(),
  linkedin: z.string().url().or(z.string().length(0)).optional(),
});

const teamMemberSchema = z.object({
  name: z.string().min(1, "Name is required"),
  linkedinUrl: z.string().url().or(z.string().length(0)).optional(),
  profileImage: z.any().optional().nullable(),
});

export const projectSubmissionSchema = z.object({
  title: z.string().min(1, "Title is required").max(100),
  subtitle: z.string().min(1, "Subtitle is required").max(200),
  problemStatement: z.string().min(1, "Problem statement is required"),
  solution: z.string().min(1, "Solution is required"),
  appLogo: z.any().optional().nullable(),
  coverImage: z.any().optional().nullable(),
  demoVideo: z.string().url().or(z.string().length(0)).optional(),
  features: z.string().min(1, "Features are required"),
  techStack: z.array(z.string()).min(1, "Select at least one technology"),
  projectType: z.array(z.string()).min(1, "Select at least one project type"),
  projectStatus: z.enum(["idea", "mvp", "deployed", "startup"]),
  sdgGoals: z.array(z.number()).optional(),
  projectDomains: z.array(z.string()).min(1, "Select at least one domain"),
  externalLinks: externalLinksSchema,
  teamMembers: z.array(teamMemberSchema).min(1, "Add at least one team member"),
  teamContact: z.string().min(1, "Team contact is required"),
  teamEmail: z.string().email("Must be a valid email").optional(),
  teamPhone: z.string().optional(),
  slideImages: z.array(z.any()).optional(),
});

export type ProjectSubmissionSchema = z.infer<typeof projectSubmissionSchema>;
