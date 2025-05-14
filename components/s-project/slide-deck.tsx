import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Maximize, X } from "lucide-react";
import { IProjectSlide } from "@/types/project/type";
import { NoMedia } from "../Empty-states/emptyState";

interface SlideDeckProps {
  slides?: IProjectSlide[];
}

export const SlideDeck: React.FC<SlideDeckProps> = ({ slides }) => {
  const [modalImage, setModalImage] = useState<string | null>(null);

  return (
    <Card className="mt-8 p-6">
      <h2 className="text-2xl font-semibold mb-4">Project Gallery</h2>

      {slides && slides.length > 0 ? (
        <>
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
                <div className="relative cursor-pointer overflow-hidden rounded-lg group">
                  <img
                    src={slide.slides_content}
                    loading="lazy"
                    alt="Slide image"
                    className="w-full aspect-video object-cover transition-transform duration-300 group-hover:scale-105"
                    onClick={() => setModalImage(slide.slides_content)}
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button
                      className="text-white bg-white/10 hover:bg-white/20 p-2 rounded-full"
                      onClick={() => setModalImage(slide.slides_content)}
                    >
                      <Maximize className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>


          {/* Modal */}
          {modalImage && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
              <div className="relative max-w-5xl w-full p-4">
                <img
                  src={modalImage}
                  alt="Fullscreen slide"
                  className="w-full rounded-xl shadow-2xl"
                />
                <Button
                  className="absolute top-6 right-6 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg"
                  onClick={() => setModalImage(null)}
                >
                  <X className="w-6 h-6 text-black" />
                </Button>
              </div>
            </div>
          )}
        </>
      ) : (
        <NoMedia />
      )}

      {/* Custom Swiper Navigation Styling */}
      <style jsx global>{`
        .swiper-button-next,
        .swiper-button-prev {
          background: rgba(255, 255, 255, 0.8);
          border-radius: 9999px;
          width: 40px;
          height: 40px;
          color: #000;
          transition: background 0.2s ease;
        }

        .swiper-button-next:hover,
        .swiper-button-prev:hover {
          background: rgba(255, 255, 255, 1);
        }

        .swiper-button-next::after,
        .swiper-button-prev::after {
          font-size: 16px;
          font-weight: bold;
        }
      `}</style>
    </Card>
  );
};
