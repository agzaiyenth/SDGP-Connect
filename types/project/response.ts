// Copyright (c) 2025, Psycode Lab's (https://www.psycodelabs.lk). All Rights Reserved.
//
// This software is the property of Psycode Lab's. and its suppliers, if any.
// Dissemination of any information or reproduction of any material contained
// herein in any form is strictly forbidden, unless permitted by Psycode Lab's expressly.
// You may not alter or remove any copyright or other notice from copies of this content.
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
