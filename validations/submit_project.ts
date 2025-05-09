import {
    ProjectDomainEnum,
    ProjectStatusEnum,
    ProjectTypeEnum,
    SDGGoalEnum,
    TechStackEnum,
    SocialTypeEnum
} from "@prisma/client";
import { z } from "zod";

const teamMemberSchema = z.object({
  name: z.string().min(1, "Name is required"),
  linkedin_url: z.string().url().or(z.string().length(0)).optional(),
  profile_image: z.any().optional().nullable(),
});

// Convert enum objects to Zod enums
const projectStatusSchema = z.nativeEnum(ProjectStatusEnum);
const projectDomainSchema = z.nativeEnum(ProjectDomainEnum);
const projectTypeSchema = z.nativeEnum(ProjectTypeEnum);
const sdgGoalSchema = z.nativeEnum(SDGGoalEnum);
const techStackSchema = z.nativeEnum(TechStackEnum);
const socialTypeSchema = z.nativeEnum(SocialTypeEnum);

export const projectSubmissionSchema = z.object({
  metadata: z.object({
    sdgp_year: z.string().min(1, "Year is required"),
    group_num: z.string().min(1, "Team number is required"),
    title: z.string().min(1, "Title is required").max(100),
    subtitle: z.string().optional().nullable(),
    website: z.string().url("Must be a valid URL").or(z.string().length(0)).optional().nullable(),
    cover_image: z.any().optional().nullable(),
    logo: z.any().optional().nullable(),
  }),
  
  projectDetails: z.object({
    problem_statement: z.string().min(1, "Problem statement is required"),
    solution: z.string().min(1, "Solution is required"),
    features: z.string().min(1, "Features are required"),
    team_email: z.string().email("Must be a valid email"),
    team_phone: z.string().optional(),
  }),
  
  status: z.object({
    status: projectStatusSchema,
  }),
  
  // Associations using proper enums
  domains: z.array(projectDomainSchema).min(1, "Select at least one domain"),
  projectTypes: z.array(projectTypeSchema).min(1, "Select at least one project type"),
  sdgGoals: z.array(sdgGoalSchema).optional(),
  techStack: z.array(techStackSchema).min(1, "Select at least one technology"),
  
  // Team members
  team: z.array(teamMemberSchema).min(1, "Add at least one team member"),
  
  // Social links
  socialLinks: z.array(
    z.object({
      link_name: socialTypeSchema,
      url: z.string().url("Must be a valid URL"),
    })
  ).optional(),
  
  // Slides content
  slides: z.array(
    z.object({
      slides_content: z.string().min(1, "Slide content is required"),
    })
  ).max(10, "You can upload a maximum of 10 slides").optional(),
});

export type ProjectSubmissionSchema = z.infer<typeof projectSubmissionSchema>;