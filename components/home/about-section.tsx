import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function About() {
  return (
    <section className="py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-3xl font-bold mb-6 text-center">About SDGP Module</h2>

        <div className="bg-dark rounded-xl p-8 shadow">
          <p className="text-muted-foreground mb-4">
            The Software Development Group Project (SDGP) module challenges students to work in teams to design and
            build innovative applications that address real-world problems while contributing to the UN Sustainable
            Development Goals.
          </p>
          <p className="text-muted-foreground mb-4">
            Throughout the module, students learn to collaborate effectively, manage projects using agile methodologies,
            and apply modern software development practices to create impactful solutions.
          </p>
          <p className="text-muted-foreground">
            SDGP Connect serves as a platform to showcase these projects, connect students with industry partners, and
            inspire future innovations.
          </p>

          <div className="mt-6 text-center">
            <Link href="/about">
              <Button variant="default">View More</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
