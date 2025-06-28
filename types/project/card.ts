import { ProjectDomainEnum, ProjectStatusEnum, ProjectTypeEnum } from "@/prisma/prisma-types";

export interface ProjectCardType {
  id: string;
  title: string;
  subtitle?: string;
  coverImage?: string;
  status: ProjectStatusEnum;
  projectTypes: ProjectTypeEnum[];
  domains: ProjectDomainEnum[];
}
