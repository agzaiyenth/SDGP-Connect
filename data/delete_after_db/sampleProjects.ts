// To be deleted after connecting DB
import lexi from "@/public/LEXi/1.jpg"
import lexi1 from "@/public/LEXi/4.jpg"
import lexi2 from "@/public/LEXi/3.jpg"
import lexi3 from "@/public/LEXi/5.jpg"
import lexi4 from "@/public/LEXi/6.jpg"

export const projects = [
    {
        id: "lexi",
        title: "LEXI",
        subtitle: "AI-powered learning assistant for students",
        problemStatement:
            "Many students struggle with personalized learning experiences, effective study plans, and real-time academic support, impacting their educational performance.",
        solution:
            "LEXI is an AI-powered learning assistant that provides real-time study guidance, personalized recommendations, interactive learning modules, and instant query resolution.",
        features: [
            "AI-driven tutoring",
            "Personalized study plans",
            "24/7 academic support",
            "Voice & text-based interaction",
            "Integration with learning platforms",
        ],
        techStack: ["React", "OpenAI API", "Spring Boot", "MySQL"],
        status: "MVP",
        domains: ["Education", "AI/ML"],
        sdgGoals: ["Quality Education", "Innovation"],
        coverImage: lexi,
        gallery: [
            lexi1,
            lexi2,
            lexi3, 
            lexi4,
            "/placeholder.svg?height=600&width=800",
        ],
        featured: true,
    },
    {
        id: "health-companion",
        title: "Health Companion",
        subtitle: "AI-powered health monitoring and recommendation platform",
        problemStatement:
            "Many individuals, especially in remote areas, lack access to regular health assessments and personalized healthcare advice, leading to preventable health complications.",
        solution:
            "Health Companion uses AI to analyze user-provided health data, offering personalized recommendations, early warning signs detection, and connecting users with healthcare providers when necessary.",
        features: [
            "Personalized health dashboard",
            "AI symptom checker",
            "Medication reminder system",
            "Telemedicine integration",
            "Health records management",
        ],
        techStack: ["React", "TensorFlow", "Node.js", "MongoDB", "Flutter"],
        status: "Completed",
        domains: ["Healthcare", "AI/ML"],
        sdgGoals: ["Good Health", "Reduced Inequalities"],
        coverImage: "/placeholder.svg?height=600&width=800",
        gallery: [
            "/placeholder.svg?height=600&width=800",
            "/placeholder.svg?height=600&width=800",
            "/placeholder.svg?height=600&width=800",
            "/placeholder.svg?height=600&width=800",
            "/placeholder.svg?height=600&width=800",
        ],
        featured: true,
    },
    {
        id: "eco-harvest",
        title: "EcoHarvest",
        subtitle: "Smart agriculture management system for small-scale farmers",
        problemStatement:
            "Small-scale farmers face challenges in optimizing crop yields, managing resources efficiently, and adapting to changing climate conditions, leading to food insecurity and economic hardship.",
        solution:
            "EcoHarvest provides an accessible platform that combines IoT sensors, weather data, and machine learning to offer real-time insights and recommendations for sustainable farming practices.",
        features: [
            "Soil moisture and nutrient monitoring",
            "Weather prediction and alerts",
            "Crop disease detection using image recognition",
            "Water management optimization",
            "Harvest planning tools",
        ],
        techStack: ["Python", "TensorFlow", "React", "AWS", "Arduino"],
        status: "In Progress",
        domains: ["Agriculture", "Environment"],
        sdgGoals: ["Zero Hunger", "Climate Action", "Clean Water"],
        coverImage: "/placeholder.svg?height=600&width=800",
        gallery: [
            "/placeholder.svg?height=600&width=800",
            "/placeholder.svg?height=600&width=800",
            "/placeholder.svg?height=600&width=800",
            "/placeholder.svg?height=600&width=800",
            "/placeholder.svg?height=600&width=800",
        ],
        featured: true,
    },
    {
        id: "edusphere",
        title: "EduSphere",
        subtitle: "Adaptive learning platform bridging educational gaps",
        problemStatement:
            "Educational inequalities persist globally, with many students lacking access to quality resources and personalized learning approaches that cater to their unique needs and learning styles.",
        solution:
            "EduSphere creates an adaptive learning environment that customizes content based on individual learning patterns, provides offline access, and connects students with mentors from around the world.",
        features: [
            "Personalized learning paths",
            "Offline content access",
            "Peer-to-peer knowledge sharing",
            "Progress tracking and visualization",
            "Virtual tutoring sessions",
        ],
        techStack: ["Next.js", "TypeScript", "Firebase", "TensorFlow", "Express"],
        status: "Prototype",
        domains: ["Education", "Accessibility"],
        sdgGoals: ["Quality Education", "Reduced Inequalities", "Partnerships"],
        coverImage: "/placeholder.svg?height=600&width=800",
        gallery: [
            "/placeholder.svg?height=600&width=800",
            "/placeholder.svg?height=600&width=800",
            "/placeholder.svg?height=600&width=800",
            "/placeholder.svg?height=600&width=800",
            "/placeholder.svg?height=600&width=800",
        ],
        featured: false,
    },
    {
        id: "urban-pulse",
        title: "Urban Pulse",
        subtitle: "Smart city infrastructure monitoring and management",
        problemStatement:
            "Rapid urbanization creates challenges in managing city infrastructure efficiently, leading to resource wastage, environmental degradation, and reduced quality of life for residents.",
        solution:
            "Urban Pulse integrates various data sources from across the city to provide real-time monitoring of infrastructure health, enabling predictive maintenance and optimized resource allocation.",
        features: [
            "Traffic flow optimization",
            "Energy usage monitoring",
            "Waste management tracking",
            "Public safety alerts",
            "Infrastructure maintenance predictions",
        ],
        techStack: ["Python", "React", "Docker", "AWS", "TensorFlow"],
        status: "Concept",
        domains: ["Smart Cities", "Environment"],
        sdgGoals: ["Sustainable Cities", "Climate Action", "Industry & Innovation"],
        coverImage: "/placeholder.svg?height=600&width=800",
        gallery: [
            "/placeholder.svg?height=600&width=800",
            "/placeholder.svg?height=600&width=800",
            "/placeholder.svg?height=600&width=800",
            "/placeholder.svg?height=600&width=800",
            "/placeholder.svg?height=600&width=800",
        ],
        featured: false,
    },
    {
        id: "finclusion",
        title: "Finclusion",
        subtitle: "Financial inclusion platform for underserved communities",
        problemStatement:
            "Millions of people globally remain excluded from traditional financial systems, limiting their ability to save, invest, and build economic security for themselves and their families.",
        solution:
            "Finclusion creates a blockchain-based financial ecosystem that provides accessible banking services, microloans, and financial education to underserved communities through a simple mobile interface.",
        features: [
            "Digital identity verification",
            "Microloans and peer-to-peer lending",
            "Financial literacy modules",
            "Offline transaction capabilities",
            "Community savings groups",
        ],
        techStack: ["React Native", "Node.js", "MongoDB", "Solidity", "Express"],
        status: "In Progress",
        domains: ["Financial Inclusion", "Education"],
        sdgGoals: ["No Poverty", "Reduced Inequalities", "Decent Work"],
        coverImage: "/placeholder.svg?height=600&width=800",
        gallery: [
            "/placeholder.svg?height=600&width=800",
            "/placeholder.svg?height=600&width=800",
            "/placeholder.svg?height=600&width=800",
            "/placeholder.svg?height=600&width=800",
            "/placeholder.svg?height=600&width=800",
        ],
        featured: true,
    },
]

export const lecturers = [
    {
        id: "kushan-bharethi",
        name: "Sir Kushan Bharethi",
        role: "Senior Lecturer",
        bio: "Experienced lecturer in software engineering and AI with a passion for innovative education.",
        email: "kushan.bharethi@example.com",
        phone: "+94 71 123 4567",
        image: "/placeholder.svg?height=400&width=400",
    },
    {
        id: "surech-peiris",
        name: "Sir Surech Peiris",
        role: "Professor of Computer Science",
        bio: "Expert in computational theories and advanced machine learning applications.",
        email: "surech.peiris@example.com",
        phone: "+94 71 234 5678",
        image: "/placeholder.svg?height=400&width=400",
    },
    {
        id: "banuka-athuraliya",
        name: "Sir Banuka Athuraliya",
        role: "Lecturer in Cybersecurity",
        bio: "Specialist in network security, cryptography, and ethical hacking methodologies.",
        email: "banuka.athuraliya@example.com",
        phone: "+94 71 345 6789",
        image: "/placeholder.svg?height=400&width=400",
    }
];

