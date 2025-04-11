import { ArrowRight, Eye, Link, Target, Zap } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function AboutSection() {
  return (
    <section className="w-full py-12 md:py-14 lg:py-22  text-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="relative w-24 h-24 mb-2">
            <div className="absolute inset-0 flex items-center justify-center bg-zinc-800 rounded-2xl">
              <div className="w-12 h-12 text-white flex items-center justify-center ">
                {/* TODO REPLACE SVG WITH IIT LOGO */}
                <Image 
                    src="/placeholder.svg?height=48&width=48"
                    alt="Logo"
                    width={48}
                    height={48}
                />
              </div>
            </div>
          </div>

          <div className="inline-block rounded-full bg-zinc-800 px-3 py-1 text-sm text-zinc-300 mb-2">
            Unveiling Our Latest Innovation
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter max-w-3xl">
            Experience the Future of Efficiency
          </h1>

          <p className="text-zinc-400 md:text-xl max-w-[700px] mt-4 mb-8">
            Revolutionize your operations and unlock unprecedented levels of productivity with our cutting-edge feature.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mt-12">
            {/* Left Column */}
            <div className="flex flex-col p-6 border border-zinc-800 rounded-lg">
              <div className="inline-flex items-center space-x-2 mb-2">
                <Eye size={18} className="text-white" />
                <span className="text-sm bg-zinc-800 px-3 py-1 rounded-full">Our Vision</span>
              </div>

              <h3 className="text-xl font-bold mb-3">Accelerated Workflows</h3>

              <p className="text-zinc-400 mb-6 flex-grow">
                Harness the power of intuitive design and smart automation to streamline your processes and reclaim
                valuable time.
              </p>

              <Button variant="outline" className="justify-between group border-zinc-800 hover:bg-zinc-800">
                Discover How
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            {/* Middle Column */}
            <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-b from-zinc-800 to-zinc-900 rounded-lg relative">
              <div className="w-full aspect-square bg-zinc-700 rounded-md flex items-center justify-center mb-6">
                <Image
                  src="/placeholder.svg?height=200&width=200"
                  alt="Product preview"
                  width={200}
                  height={200}
                  className="opacity-50"
                />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-80 rounded-b-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium">Active Now</span>
                </div>
                <p className="text-sm text-zinc-300 mt-2">
                  Harness the power of intuitive design and smart automation to streamline your processes.
                </p>
              </div>
            </div>

            {/* Right Column */}
            <div className="flex flex-col p-6 border border-zinc-800 rounded-lg">
              <div className="inline-flex items-center space-x-2 mb-2">
                <Target size={18} className="text-white" />
                <span className="text-sm bg-zinc-800 px-3 py-1 rounded-full">Our Mission</span>
              </div>

              <h3 className="text-xl font-bold mb-3">Boundless Connectivity</h3>

              <p className="text-zinc-400 mb-6 flex-grow">
                Effortlessly integrate with your preferred tools and platforms, creating a seamless and interconnected
                digital environment.
              </p>

              <Button variant="outline" className="justify-between group border-zinc-800 hover:bg-zinc-800">
                Uncover Integrations
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
