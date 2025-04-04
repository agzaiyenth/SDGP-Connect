import { AssociationType, ProjectApprovalStatus, ProjectDomainEnum, ProjectStatusEnum, ProjectTypeEnum, SDGGoalEnum, TechStackEnum } from "@prisma/client";
import { IconType } from "react-icons/lib";
import { User } from "../user/type";

export interface IProject {
    metadata: IProjectMetadata;
    content?: IProjectContent;
  }
  export interface IProjectMetadata {
    project_id: string;
    sdgp_year: string;
    group_num: string;
    title: string;
    subtitle?: string;
    cover_image?: string;
    logo?: string;
    featured: boolean;
    featured_by_userId?: string;
    createdAt?: Date;
    updatedAt?: Date;
  }
  
  export interface IProjectContent {
    content_id: string;
    project_id: string;
    projectDetails?: IProjectDetails;
    status?: IProjectStatus;
    associations: IProjectAssociation[];
    slides: IProjectSlide[];
    team: IProjectTeam[];
    socialLinks: IProjectSocialLink[];
    createdAt?: Date;
    updatedAt?: Date;
  }
  
  export interface IProjectDetails {
    id: string;
    project_id: string;
    problem_statement: string;
    solution: string;
    features: string;
    team_email: string;
    team_phone: string;
    createdAt?: Date;
    updatedAt?: Date;
  }
  
  export interface IProjectStatus {
    content_id: string;
    status: ProjectStatusEnum;
    approved_status: ProjectApprovalStatus;
    approved_at?: Date;
    approved_by?: User;
    createdAt?: Date;
    updatedAt?: Date;
  }
  
  export interface IProjectAssociation {
    id: string;
    project_id: string;
    type: AssociationType;
    value: string;
    domain?:     ProjectDomainEnum,  
    projectType?: ProjectTypeEnum,  
    sdgGoal?:    SDGGoalEnum,
    techStack?:  TechStackEnum,
    createdAt?: Date;
    updatedAt?: Date;
  }
  
  export interface IProjectSlide {
    id: string;
    project_id: string;
    slides_content: string;
    createdAt?: Date;
    updatedAt?: Date;
  }
  
  export interface IProjectTeam {
    member_id: string;
    project_id: string;
    name: string;
    linkedin_url?: string;
    profile_image?: string;
    createdAt?: Date;
    updatedAt?: Date;
  }
  
  export interface IProjectSocialLink {
    id: string;
    project_id: string;
    link_name: string;
    url: string;
    createdAt?: Date;
    updatedAt?: Date;
  }
  
  export type StackType = "frontend" | "backend" | "mobile" | "cloud" | "database" | "ai" | "hardware" ;

  export type TechStackItem = {
    value: string;
    label: string;
    type: StackType;
    icon?: IconType;
  };
