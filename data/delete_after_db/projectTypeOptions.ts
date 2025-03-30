import { ProjectType } from "@/types/project";
import { FaDesktop, FaGlobe, FaMobileAlt, FaTools } from "react-icons/fa";
// Delete after connecting DB

export const projectTypeOptions = [
  { value: "mobile", label: "Mobile App", icon: FaMobileAlt },
  { value: "web", label: "Web Application", icon: FaGlobe },
  { value: "hardware", label: "Hardware", icon: FaTools },
  { value: "desktop", label: "Desktop Software", icon: FaDesktop },
  { value: "wearable", label: "Wearable App", icon: FaMobileAlt },
];
