export interface Project {
    id: string
    title: string
    subtitle: string
    problemStatement: string
    solution: string
    features: string[]
    techStack: string[]
    status: "Completed" | "In Progress" | "Prototype" | "Concept"
    domains: string[]
    sdgGoals: string[]
    coverImage: string
    gallery: string[]
    featured: boolean
  }
  
  export interface Lecturer {
    id: string
    name: string
    role: string
    bio: string
    email: string
    phone: string | null
    image: string
  }
  
  export interface User {
    id: string
    email: string
    name: string
    role: "student" | "lecturer" | "investor"
    avatarUrl?: string
  }
  
  export interface SDGGoal {
    id: number
    name: string
    description: string
    iconUrl: string
  }
  
  export interface Domain {
    id: string
    name: string
    description: string
    projectCount: number
  }
  
  