"use client"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/effect-coverflow"
import "swiper/css/pagination"
import "swiper/css/navigation"
import { EffectCoverflow, Pagination, Navigation, Autoplay } from "swiper/modules"
import { Button } from "../ui/button"
import { useGetFeaturedProjects } from "@/hooks/project/useGetFeaturedProjects"
import Link from "next/link"
import Image from "next/image"

export default function Featured() {
  const { featuredProjects, isLoading, error } = useGetFeaturedProjects();

  if (error || (featuredProjects.length === 0 && !isLoading)) {
    return null;
  }

  return (
    <section className="py-[60px] sm:py-[100px] bg-[#0c0a09] relative -mt-[150px]">
      <style jsx global>{`
        @keyframes smoothGlow {
          0% {
            box-shadow: 0 15px 30px rgba(42, 82, 152, 0.2),
                        0 0 0 1px rgba(42, 82, 152, 0.1);
          }
          50% {
            box-shadow: 0 20px 40px rgba(42, 82, 152, 0.4),
                        0 0 20px rgba(42, 82, 152, 0.2),
                        0 0 0 1px rgba(42, 82, 152, 0.2);
          }
          100% {
            box-shadow: 0 15px 30px rgba(42, 82, 152, 0.2),
                        0 0 0 1px rgba(42, 82, 152, 0.1);
          }
        }
        
        .swiper-slide-active .project-card {
          animation: smoothGlow 5s infinite cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-5">

        {/* Updated Featured Projects Heading */}
        <h2 className="text-[2.5rem] sm:text-[3rem] mb-[30px] sm:mb-[50px] text-center bg-gradient-to-r from-white via-white to-[#dcdcdc] bg-clip-text text-transparent inline-block relative left-1/2 -translate-x-1/2 font-extrabold text-shadow-lg">
          Featured Projects
        </h2>


        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2,
            slideShadows: false,
          }}
          modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 2,
            },
          }}
          className="w-full py-[50px] pb-[80px] justify-center"
        >
          <div className="absolute top-0 left-0 h-full z-99 w-22 pointer-events-none bg-gradient-to-r from-background to-transparent" />
          <div className="absolute top-0 right-0 h-full z-99 w-22 pointer-events-none bg-gradient-to-l from-background to-transparent" />

          {isLoading ? (
            // Loading state - show skeleton cards
            Array.from({ length: 3 }).map((_, index) => (
              <SwiperSlide key={`skeleton-${index}`}>
                <div className="project-card bg-opacity-40 bg-[#1e1e1e] rounded-[20px] overflow-hidden shadow-lg border border-white/[0.08] h-[450px] scale-90 backdrop-blur-xl">
                  <div className="relative h-[250px] w-full bg-[#2a2a2a] overflow-hidden animate-pulse">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 z-[1]"></div>
                  </div>
                  <div className="p-6 bg-gradient-to-b from-transparent to-[#14141940] h-[200px] flex flex-col">
                    <div className="h-8 w-3/4 bg-gray-700 rounded animate-pulse mb-2"></div>
                    <div className="h-4 w-full bg-gray-700 rounded animate-pulse mb-5"></div>
                    <div className="mt-auto self-start h-6 w-1/3 bg-gray-700 rounded animate-pulse"></div>
                  </div>
                </div>
              </SwiperSlide>
            ))
          ) : (
            // Data loaded - display actual projects
            featuredProjects.map((project) => (
              <SwiperSlide key={project.id}>
                <Link href={`/project/${project.id}`}>
                  <div className="project-card bg-opacity-40 bg-[#1e1e1e] rounded-[20px] overflow-hidden shadow-lg border border-white/[0.08] h-[450px] scale-90 backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.25,0.8,0.25,1)]">
                    <div className="relative h-[250px] w-full bg-[#2a2a2a] overflow-hidden">
                      {project.status && (
                        <span className="absolute top-5 right-5 bg-primary/80 text-white py-2 px-4 rounded-full text-sm font-semibold z-[2] backdrop-blur-md shadow-md">
                          {project.status}
                        </span>
                      )}
                      {project.coverImage && (
                        <Image
                          width={300}
                          height={200}
                          src={project.coverImage}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                      )}
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 z-[1]"></div>
                    </div>
                    <div className="p-6 bg-gradient-to-b from-transparent to-[#14141940] h-[200px] flex flex-col">
                      <h3 className="text-2xl mb-2 font-bold transition-all duration-300 ease-in-out group-[.swiper-slide-active]:bg-gradient-to-r group-[.swiper-slide-active]:from-primary group-[.swiper-slide-active]:to-accent group-[.swiper-slide-active]:bg-clip-text group-[.swiper-slide-active]:text-transparent group-[.swiper-slide-active]:-translate-y-[3px]">
                        {project.title}
                      </h3>
                      <p className="text-base text-white/70 mb-5 transition-all duration-300 ease-in-out group-[.swiper-slide-active]:text-white/90">
                        {project.subtitle}
                      </p>
                      <div className="mt-auto flex flex-wrap gap-2">
                        {project.projectTypes.map((type, index) => (
                          <span
                            key={`${project.id}-type-${index}`}
                            className="inline-block bg-primary/15 text-primary py-1 px-4 rounded-full text-sm transition-all duration-300 ease-in-out backdrop-blur-md border border-primary/10 group-[.swiper-slide-active]:bg-primary/25 group-[.swiper-slide-active]:shadow-[0_0_15px_rgba(108,99,255,0.3)] group-[.swiper-slide-active]:-translate-y-[3px]"
                          >
                            {type}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))
          )}

          {/* Navigation and Pagination */}
          {/* <div className="swiper-button-next bg-[#121212]/70 w-[50px] h-[50px] rounded-full flex items-center justify-center transition-all duration-300 ease-in-out backdrop-blur-[10px] hover:bg-primary hover:text-white hover:scale-110"></div>
          <div className="swiper-button-prev bg-[#121212]/70 w-[50px] h-[50px] rounded-full flex items-center justify-center transition-all duration-300 ease-in-out backdrop-blur-[10px] hover:bg-primary hover:text-white hover:scale-110"></div> */}
        </Swiper>
        <div className="flex justify-center mt-10">
          <Button >
            view all projects
          </Button>
        </div>
      </div>
    </section>
  )
}
