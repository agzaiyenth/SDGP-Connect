import { Users, Award, TrendingUp, Rocket } from "lucide-react"

const stats = [
  {
    title: "240+",
    description: "Student Projects",
    icon: Users,
  },
  {
    title: "53",
    description: "Industry Partners",
    icon: Award,
  },
  {
    title: "15+",
    description: "SDGs Addressed",
    icon: TrendingUp,
  },
  {
    title: "3",
    description: "Funded Startups",
    icon: Rocket,
  },
]

export default function ImpactStats() {
  return (
    <section className="py-12 px-4 bg-dark text-white">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Our Impact</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center text-center p-6 rounded-xl bg-muted">
              <div className="rounded-full bg-primary/10 p-4 mb-4">
                <stat.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-3xl font-bold mb-2">{stat.title}</h3>
              <p className="text-gray-300">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}



