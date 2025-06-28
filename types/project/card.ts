import { ProjectDomainEnum, ProjectStatusEnum, ProjectTypeEnum } from "@/types/prisma-types";

export interface ProjectCardType {
  id: string;
  title: string;
  subtitle?: string;
  coverImage?: string;
  status: ProjectStatusEnum;
  projectTypes: ProjectTypeEnum[];
  domains: ProjectDomainEnum[];
}
