import { 
    SiReact, SiAngular, SiVuedotjs, SiNodedotjs, SiPython, SiDjango, SiFlask, 
   SiSpring, SiDotnet, SiPhp, SiLaravel, SiAndroid, SiIos, SiFlutter, 
     SiFirebase,  SiMongodb, SiMysql, 
    SiPostgresql, SiTensorflow, SiPytorch, SiArduino, SiRaspberrypi 
  } from "react-icons/si";
  import { FaAws } from "react-icons/fa";
  import { DiJava, DiReact } from "react-icons/di";
import { TechStackItem } from "@/types/Project";

export const techStackOptions: TechStackItem[] = [
    { value: "react", label: "React", type: "frontend", icon: SiReact },
    { value: "angular", label: "Angular", type: "frontend", icon: SiAngular },
    { value: "vue", label: "Vue.js", type: "frontend", icon: SiVuedotjs },
    { value: "node", label: "Node.js", type: "backend", icon: SiNodedotjs },
    { value: "python", label: "Python", type: "backend", icon: SiPython },
    { value: "django", label: "Django", type: "backend", icon: SiDjango },
    { value: "flask", label: "Flask", type: "backend", icon: SiFlask },
    { value: "java", label: "Java", type: "backend", icon: DiJava },
    { value: "spring", label: "Spring", type: "backend", icon: SiSpring },
    { value: "dotnet", label: ".NET", type: "backend", icon: SiDotnet },
    { value: "php", label: "PHP", type: "backend", icon: SiPhp },
    { value: "laravel", label: "Laravel", type: "backend", icon: SiLaravel },
    { value: "android", label: "Android", type: "frontend", icon: SiAndroid },
    { value: "ios", label: "iOS", type: "mobile", icon: SiIos },
    { value: "flutter", label: "Flutter", type: "mobile", icon: SiFlutter },
    { value: "react-native", label: "React Native", type: "mobile", icon: DiReact },
    { value: "firebase", label: "Firebase", type: "cloud", icon: SiFirebase },
    { value: "aws", label: "AWS", type: "cloud", icon: FaAws },
    { value: "mongodb", label: "MongoDB", type: "database", icon: SiMongodb },
    { value: "mysql", label: "MySQL", type: "database", icon: SiMysql },
    { value: "postgresql", label: "PostgreSQL", type: "database", icon: SiPostgresql },
    { value: "tensorflow", label: "TensorFlow", type: "ai", icon: SiTensorflow },
    { value: "pytorch", label: "PyTorch", type: "ai", icon: SiPytorch },
    { value: "arduino", label: "Arduino", type: "hardware", icon: SiArduino },
    { value: "raspberry-pi", label: "Raspberry Pi", type: "hardware", icon: SiRaspberrypi },
  ];
  