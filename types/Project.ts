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