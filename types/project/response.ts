export type SubmitProjectResponse = {
  success: boolean;
  message: string;
  data?: {
    projectId: string;
  };
  errors?: any;
};