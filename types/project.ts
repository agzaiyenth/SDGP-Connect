import { IconType } from "react-icons/lib";

export type SDGGoal = {
    id: number;
    name: string;
    icon: string;
    description: string;
  };
  
  export type TechStackItem = {
    value: string;
    label: string;
    type: StackType;
    icon?: IconType;
  };

  export type StackType = "frontend" | "backend" | "mobile" | "cloud" | "database" | "ai" | "hardware" ;
  
  export type ProjectType = {
    value: string;
    label: string;
    icon?: IconType;
  };

  export type ProjectDomain = {
    id: number;
    name: string;
  };


  // FROM SCHEMA

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
    createdAt: Date;
    updatedAt: Date;
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
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface IProjectDetails {
    id: string;
    project_id: string;
    problem_statement: string;
    solution: string;
    features: string;
    team_email: string;
    team_phone: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface IProjectStatus {
    content_id: string;
    status: IProjectStatusEnum;
    approved: boolean;
    approved_by_userId?: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface IProjectAssociation {
    id: string;
    project_id: string;
    type: AssociationType;
    value: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface IProjectSlide {
    id: string;
    project_id: string;
    slides_content: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface IProjectTeam {
    member_id: string;
    project_id: string;
    name: string;
    linkedin_url?: string;
    profile_image?: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface IProjectSocialLink {
    id: string;
    project_id: string;
    link_name: string;
    url: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export enum AssociationType {
    PROJECT_TYPE = "PROJECT_TYPE",
    PROJECT_DOMAIN = "PROJECT_DOMAIN",
    PROJECT_SDG = "PROJECT_SDG",
    PROJECT_TECH = "PROJECT_TECH"
  }
  
  export enum IProjectStatusEnum {
    IDEA = "IDEA",
    MVP = "MVP",
    DEPLOYED = "DEPLOYED",
    STARTUP = "STARTUP"
  }