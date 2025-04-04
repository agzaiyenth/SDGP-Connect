export interface SubmitProjectResponse {
  success: boolean;
  message: string;
  data?: {
    projectId: string;
  };
  errors?: any;
}

export interface PendingProject {
  id: number;
  title: string;
  groupNumber: string;
  submissionDate: string;
  status: string;
}

export interface RejectedProject {
  id: number;
  title: string;
  groupNumber: string;
  rejectedBy: string;
  rejectedAt: string;
  rejectionReason: string;
}

export interface ApprovedProject {
  id: number;
  title: string;
  groupNumber: string;
  featured: boolean;
  approvedBy: string;
  approvedAt: string;
}
