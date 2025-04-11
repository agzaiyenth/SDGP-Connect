"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import CountUp from "react-countup";
import Tilt from "react-parallax-tilt";

const stats = [
  { number: 240, label: "Student Projects" },
  { number: 53, label: "Industry Partners" },
  { number: 15, label: "SDGs Addressed" },
  { number: 3, label: "Funded Startups" },
];

export default function ImpactSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [inView, setInView] = useState<boolean[]>([false, false, false, false]);
  const [animationComplete, setAnimationComplete] = useState<boolean[]>([
    false,
    false,
    false,
    false,
  ]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const controls = useAnimation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = cardRefs.current.findIndex(
              (ref) => ref === entry.target
            );
            if (index !== -1) {
              setInView((prev) => {
                const newState = [...prev];
                newState[index] = true;
                return newState;
              });
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      cardRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  // Handle animation completion
  const handleCountComplete = (index: number) => {
    setAnimationComplete((prev) => {
      const newState = [...prev];
      newState[index] = true;
      return newState;
    });
  };

  // Should the counter be animated?
  const shouldAnimate = (index: number) => {
    return (
      (hoveredIndex === index || inView[index]) && !animationComplete[index]
    );
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#040404] via-[#181918] to-[#040404] p-10">
      <motion.h2
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl md:text-5xl font-bold text-white mb-16 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-gray-100"
      >
        Our Impact
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {stats.map((stat, index) => (
          <Tilt
            tiltMaxAngleX={10}
            tiltMaxAngleY={10}
            key={index}
            scale={hoveredIndex === index ? 1.05 : 1}
            transitionSpeed={400}
            tiltReverse={true}
            perspective={800}
          >
            <motion.div
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.6,
                delay: index * 0.2,
                type: "spring",
                stiffness: 100,
              }}
              viewport={{ once: true }}
              className="relative bg-gradient-to-br from-zinc-900 to-black rounded-2xl p-10 flex flex-col items-center justify-center hover:scale-105 transition-all duration-500 overflow-hidden group shine-box"
              style={{
                boxShadow:
                  hoveredIndex === index
                    ? "0 0 25px rgba(100, 100, 100, 0.3), 0 0 15px rgba(255, 255, 255, 0.15) inset"
                    : "0 10px 30px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05) inset",
                borderRadius: "16px",
                border:
                  hoveredIndex === index
                    ? "1px solid rgba(255, 255, 255, 0.1)"
                    : "1px solid rgba(255, 255, 255, 0.05)",
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Animated particle effect on hover */}
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700`}
              >
                <div className="absolute w-40 h-40 -left-10 -top-10 bg-white/10 rounded-full blur-2xl"></div>
                <div className="absolute w-40 h-40 -right-10 -bottom-10 bg-blue-500/10 rounded-full blur-2xl"></div>
              </div>

              {/* Glowing border on hover */}
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`}
              >
                <div className="absolute inset-0 border border-white/10 rounded-2xl"></div>
                <div className="absolute inset-[-1px] border border-white/5 rounded-2xl blur-sm"></div>
              </div>

              <div className="text-5xl font-extrabold bg-gradient-to-r from-white via-white to-gray-300 bg-clip-text text-transparent relative">
                {shouldAnimate(index) ? (
                  <CountUp
                    start={0}
                    end={stat.number}
                    duration={
                      stat.number > 100 ? 2.5 : stat.number >= 50 ? 3.5 : 4.5
                    }
                    suffix="+"
                    useEasing={true}
                    useGrouping={true}
                    separator=","
                    decimal=","
                    onStart={() => {}}
                    onEnd={() => handleCountComplete(index)}
                    enableScrollSpy={false}
                    scrollSpyDelay={0}
                  />
                ) : (
                  `${stat.number}+`
                )}

                {/* Number shadow effect */}
                {hoveredIndex === index && (
                  <div className="absolute inset-0 blur-sm opacity-50 bg-gradient-to-r from-white via-white to-gray-300 bg-clip-text text-transparent z-[-1]">
                    {stat.number}+
                  </div>
                )}
              </div>

              <div className="text-gray-400 mt-4 text-center text-lg font-medium group-hover:text-gray-200 transition-colors duration-300">
                {stat.label}
              </div>

              {/* Subtle ripple effect on hover */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                animate={
                  hoveredIndex === index
                    ? {
                        scale: [1, 1.05, 1.02],
                        opacity: [0, 0.2, 0],
                      }
                    : {}
                }
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "loop",
                }}
              >
                <div className="w-full h-full rounded-2xl border border-white/5"></div>
              </motion.div>
            </motion.div>
          </Tilt>
        ))}
      </div>

      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        @keyframes pulse {
          0% {
            opacity: 0.5;
            transform: scale(0.8);
          }
          50% {
            opacity: 0.3;
            transform: scale(1.2);
          }
          100% {
            opacity: 0.5;
            transform: scale(0.8);
          }
        }

        @keyframes glow {
          0% {
            box-shadow: 0 0 5px rgba(255, 255, 255, 0.1);
          }
          50% {
            box-shadow: 0 0 20px rgba(255, 255, 255, 0.2),
              0 0 30px rgba(255, 255, 255, 0.1);
          }
          100% {
            box-shadow: 0 0 5px rgba(255, 255, 255, 0.1);
          }
        }

        @keyframes shine {
          0% {
            background-position: -100% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }

        .shine-box {
          position: relative;
          overflow: hidden;
        }

        .shine-box::after {
          content: "";
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.08),
            transparent
          );
          background-size: 200% 100%;
          animation: shine 6s infinite;
          z-index: 1;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .shine-box:hover::after {
          opacity: 1;
        }
      `}</style>
    </section>
  );
}
