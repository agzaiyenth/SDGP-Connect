import { ProjectType } from "@/types/ss";
import { FaDesktop, FaGlobe, FaMobileAlt, FaTools } from "react-icons/fa";

export const projectTypeOptions:ProjectType[] = [
  { value: "mobile", label: "Mobile App", icon: FaMobileAlt },
  { value: "web", label: "Web Application", icon: FaGlobe },
  { value: "hardware", label: "Hardware", icon: FaTools },
  { value: "desktop", label: "Desktop Software", icon: FaDesktop },
  { value: "wearable", label: "Wearable App", icon: FaMobileAlt },
];
