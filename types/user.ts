export enum Role {
    ADMIN = "ADMIN",
    MODERATOR = "MODERATOR",
    REVIEWER = "REVIEWER"
  }
  
  export interface User {
    user_id: string;
    role: Role;
    password: string;
    name: string;
    approvedProjects: string[]; // Array of project IDs
    featuredProjects: string[]; // Array of project metadata IDs
    createdAt: Date;
    updatedAt: Date;
  }
  