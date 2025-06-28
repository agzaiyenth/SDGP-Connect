import { ProjectDomainEnum, ProjectStatusEnum, ProjectTypeEnum } from "@/types/prisma-types";

export interface ProjectVoteCard {
  id: string;
  title: string;
  subtitle?: string;
  coverImage?: string;
  status: ProjectStatusEnum;
  projectTypes: ProjectTypeEnum[];
  domains: ProjectDomainEnum[];
  voteCount: number;
  hasVoted?: boolean;
  globalRank?: number;
}

export interface VoteStats {
  totalVotes: number;
}

export interface VoteQueryParams {
  page?: number;
  limit?: number;
  title?: string;
}

export interface VoteResponse {
  success: boolean;
  message: string;
  voteCount?: number;
  voterIP?: string; // Optional field for debugging purposes
}
