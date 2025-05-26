import {Eye, Target,HeartHandshake } from "lucide-react"
import Image from "next/image"

export function AboutSection() {
  return (
    <section className="w-full py-12 md:py-14 lg:py-22  text-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="relative w-24 h-24 mb-2">
            <div className="absolute inset-0 flex items-center justify-center bg-zinc-800 rounded-2xl">
              <div className="w-12 h-12 text-white flex items-center justify-center ">
                <Image
                  src="/assets/logo.png"
                  alt="Logo"
                  width={120}
                  height={80}
                />
              </div>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter max-w-3xl">
            Crafting code for a sustainable tomorrow
          </h1>

          <p className="text-zinc-400 md:text-xl max-w-[700px] mt-4 mb-8">
            Build impactful tech solutions through teamwork, innovation, and purpose driven by SDGP and the UN SDGs.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mt-8">
            {/* Vision */}
            <div className="flex flex-col p-4 border border-zinc-800 rounded-lg">
              <div className="inline-flex items-center space-x-2 mb-2 pt-6 self-center">
                <Eye size={18} className="text-white" />
                <span className="text-sm bg-zinc-800 px-3 py-1 rounded-full">Our Vision</span>
              </div>

              <h3 className="text-xl font-bold mb-2 text-center">Tech for Global Good</h3>

              <p className="text-zinc-400 mb-4 flex-grow text-center">
                To become a launchpad for socially-driven tech innovation, where young minds transform global challenges into digital opportunities, building a more sustainable and equitable future through software.
              </p>
            </div>

            {/* Core Values */}
            <div className="flex flex-col p-4 border border-zinc-800 rounded-lg">
              <div className="inline-flex items-center space-x-2 mb-2 pt-6 self-center">
                <HeartHandshake size={18} className="text-white" />
                <span className="text-sm bg-zinc-800 px-3 py-1 rounded-full">Our Core Values</span>
              </div>

              <h3 className="text-xl font-bold mb-2 text-center">Driven by Purpose</h3>

              <p className="text-zinc-400 mb-4 flex-grow text-center">
                We believe in innovation, collaboration, and meaningful impact. Our community thrives on solving real-world problems, learning continuously, and developing technology that serves humanity and the planet.
              </p>
            </div>

            {/* Mission */}
            <div className="flex flex-col p-4 border border-zinc-800 rounded-lg">
              <div className="inline-flex items-center space-x-2 mb-2 pt-6 self-center">
                <Target size={18} className="text-white" />
                <span className="text-sm bg-zinc-800 px-3 py-1 rounded-full">Our Mission</span>
              </div>

              <h3 className="text-xl font-bold mb-2 text-center">Empowering Innovators</h3>

              <p className="text-zinc-400 mb-4 flex-grow text-center">
                To empower the next generation of socially-conscious developers by offering hands-on experience in building impactful full-stack applications that address real-world challenges aligned with the UN SDGs.
              </p>
            </div>
          </div>



        </div>
      </div>
    </section>
  )
}
