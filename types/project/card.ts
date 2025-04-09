import { ProjectDomainEnum, ProjectStatusEnum, ProjectTypeEnum } from "@prisma/client";

export interface ProjectCardType {
  id: string;
  title: string;
  subtitle?: string;
  coverImage?: string;
  status: ProjectStatusEnum;
  projectTypes: ProjectTypeEnum[];
  domains: ProjectDomainEnum[];
}
