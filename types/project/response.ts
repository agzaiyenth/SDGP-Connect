export interface SubmitProjectResponse {
  success: boolean;
  message: string;
  data?: {
    projectId: string;
  };
  errors?: any;
}