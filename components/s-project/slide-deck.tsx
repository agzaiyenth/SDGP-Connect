import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Maximize } from "lucide-react";
import { IProjectSlide } from "@/types/project/type";
import { EmptyStateMedia, NoMedia } from "../Empty-states/emptyState";

interface SlideDeckProps {
  slides?: IProjectSlide[];
}

export const SlideDeck: React.FC<SlideDeckProps> = ({ slides }) => {
  return (
    <Card className="mt-8 p-6">
      <h2 className="text-2xl font-semibold mb-4">Project Gallery</h2>
      
      {slides && slides.length > 0 ? (
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="w-full"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="relative group cursor-pointer">
                <img
                  src={slide.slides_content}
                  alt="Slide image"
                  className="w-full aspect-video object-cover rounded-lg transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button
                    className="text-white"
                  >
                    <Maximize className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <NoMedia />
      )}
    </Card>
  );
};
