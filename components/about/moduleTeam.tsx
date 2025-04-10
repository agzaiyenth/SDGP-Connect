"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";


const teamMembers = [
  // VL Hybrid lecturers
  {
    name: "Banuka Athuraliya",
    role: "Module Leader (VL Hybrid)",
    email: "banu.a@iit.ac.lk",
    linkedin: "https://www.linkedin.com/in/banuka-athuraliya/",
    description:
      "Managing Director @ Andro Dollar Network (PVT) LTD | Tech YouTuber | Software Engineering, Marketing and Entrepreneurship Visiting Lecturer",
    category: "VL Hybrid",
    image: "/assets/banu sir.png",
  },
  {
    name: "Suresh Peiris",
    role: "Visiting Lecturer (Hybrid)",
    email: "suresh.p@iit.ac.lk",
    linkedin: "https://www.linkedin.com/in/suresh-peiris/",
    description:
      "Co Founder - Inforwaves | Organizer - GDG Sri Lanka | Visiting Lecturer - IIT | Cloud Researcher | National Award Winner",
    category: "VL Hybrid",
    image: "/assets/suresh sir.png",
  },
  {
    name: "Kushan Bhareti",
    role: "Visiting Lecturer (Hybrid)",
    email: "kushan.b@iit.ac.lk",
    linkedin: "https://www.linkedin.com/in/kushan-bhareti/",
    description: "Co-founder of Inforwaves | Visiting Lecturer at IIT",
    category: "VL Hybrid",
    image:"/assets/kushan sir.png",
  },
  {
    name: "Mithushan Jalangan",
    role: "Visiting Lecturer (Hybrid)",
    email: "mithushan.j@iit.ac.lk",
    linkedin: "https://www.linkedin.com/in/mithushan-jalangan/",
    description:
      "I help founders build better software | Product Engineer | Full stack Web/AI | asyncdot & shopbook.lk - Co-founder",
    category: "VL Hybrid",
    image: "/assets/Mithushan sir.png",
  },
  {
    name: "Pubudu Mihiranga",
    role: "Visiting Lecturer (Hybrid)",
    email: "pubudu.s@iit.ac.lk",
    linkedin: "https://www.linkedin.com/in/pubudu-mihiranga/",
    description:
      "Brings industry experience in software architecture and system design.",
    category: "VL Hybrid",
    image:"/assets/john.png",
  },

  // FT Hybrid lecturers
  {
    name: "Manul Singhe",
    role: "Full-Time Lecturer (Hybrid)",
    email: "manul.s@iit.ac.lk",
    linkedin: "https://www.linkedin.com/in/manul-singhe/",
    description:
      "Software Developer | Game Developer | Game Designer | Knight Owl Founder and CEO",
    category: "FT Hybrid",
    image:"/assets/manul sir.png",
  },
  {
    name: "Mohanadas Jananie",
    role: "Full-Time Lecturer (Hybrid)",
    email: "mohanadas.j@iit.ac.lk",
    linkedin: "https://www.linkedin.com/in/mohanadas-jananie/",
    description:
      "Focuses on software testing practices and quality assurance in group projects.",
    category: "FT Hybrid",
    image: "/assets/janani miss.png",
  },
  {
    name: "Seyed Ruzaik",
    role: "Full-Time Lecturer (Hybrid)",
    email: "ruzaik.s@iit.ac.lk",
    linkedin: "https://www.linkedin.com/in/seyed-ruzaik/",
    description: "Software Developer | Tech Blogger | Assistant Lecturer",
    category: "FT Hybrid",
    image: "/assets/rusaik sir.png",
  },
  {
    name: "Vinodani Thilakarathne",
    role: "Full-Time Lecturer (Hybrid)",
    email: "vinodani.t@iit.ac.lk",
    linkedin: "https://www.linkedin.com/in/vinodani-thilakarathne/",
    description:
      "Guides students in requirements gathering and business analysis for software projects.",
    category: "FT Hybrid",
    image: "/assets/john.png",
  },
  {
    name: "Asith Pallemulla",
    role: "Full-Time Lecturer (Hybrid)",
    email: "asith.p@iit.ac.lk",
    linkedin: "https://www.linkedin.com/in/asith-pallemulla/",
    description: "Expert in back-end development and systems integration.",
    category: "FT Hybrid",
    image: "/assets/asith sir.png",
  },
  {
    name: "Thashin Rahuman",
    role: "Full-Time Lecturer (Hybrid)",
    email: "thashin.r@iit.ac.lk",
    linkedin: "https://www.linkedin.com/in/thashin-rahuman/",
    description: "Software Engineer | Blockchain | React JS/ NodeJS | GO",
    category: "FT Hybrid",
    image: "/assets/thashin sir.png",
  },
  {
    name: "Ahtshayan Udayasanthiran",
    role: "Full-Time Lecturer (Hybrid)",
    email: "ahtshayan.u@iit.ac.lk",
    linkedin: "https://www.linkedin.com/in/ahtshayan-udayasanthiran/",
    description:
      "Focuses on software development lifecycle and project documentation.",
    category: "FT Hybrid",
    image: "/assets/ahtshayan sir.png",
  },

  // VL Online lecturers
  {
    name: "John Sriskandarajah",
    role: "Visiting Lecturer (Online)",
    email: "john.s@iit.ac.lk",
    linkedin: "https://www.linkedin.com/in/john-sriskandarajah/",
    description:
      "CEO @ Telexar | Helping Businesses Scale with Offshore Teams | Resource Augmentation Specialist",
    category: "VL Online",
    image:"/assets/john.png",
  },
  {
    name: "Krishnakripa Jayakumar",
    role: "Visiting Lecturer (Online)",
    email: "krishnakripa.j@iit.ac.lk",
    linkedin: "https://www.linkedin.com/in/krishnakripa-jayakumar/",
    description:
      "Cybersecurity & Software Engineering Professional | Lecturer | Multiple Award Winner",
    category: "VL Online",
    image: "/assets/kripa miss.png",
  },
  {
    name: "Deshan Sumanathilaka",
    role: "Visiting Lecturer (Online)",
    email: "deshan.s@iit.ac.lk",
    linkedin: "https://www.linkedin.com/in/deshan-sumanathilaka/",
    description:
      "PhD Candidate at Swansea University / Visiting Lecturer at IIT / Youtuber-Tutor at DS-IT Academy",
    category: "VL Online",
    image:"/assets/deshan sir.png",
  },
];

const ModuleTeam: React.FC = () => {
  // Group members by category
  const vlHybrid = teamMembers.filter(
    (member) => member.category === "VL Hybrid"
  );
  const ftHybrid = teamMembers.filter(
    (member) => member.category === "FT Hybrid"
  );
  const vlOnline = teamMembers.filter(
    (member) => member.category === "VL Online"
  );

  // Render a section for each category
  const renderTeamSection = (members: typeof teamMembers, title: string) => (
    <motion.div
      className="mb-16"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl md:text-3xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-gray-500 text-center">
        {title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
        {members.map((member, index) => (
          <motion.div
            key={index}
            className="relative bg-gradient-to-b from-zinc-900 to-black p-6 rounded-2xl shadow-lg flex flex-col items-center group overflow-hidden transform transition-all duration-500 hover:shadow-white/30 hover:shadow-xl hover:-translate-y-1"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: index * 0.08,
            }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-28 h-28 rounded-full mb-5 overflow-hidden border-4 border-gray-700 p-1 relative shine-border">
              <div className="relative w-full h-full">
                <Image
                  src={member.image}
                  alt={member.name}
                  className="rounded-full object-cover"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={index < 4}
                />
              </div>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-white text-center mb-1">
              {member.name}
            </h2>
            <p className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 font-medium text-center">
              {member.role}
            </p>

            <div className="absolute inset-0 bg-gradient-to-br from-black/95 via-zinc-900/98 to-gray-800/95 backdrop-blur-sm p-6 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-0">
              <h2 className="text-xl md:text-2xl font-extrabold text-white mb-1">
                {member.name}
              </h2>
              <p className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 font-medium">
                {member.role}
              </p>
              <p className="text-gray-300 text-center mt-4">
                {member.description}
              </p>
              <div className="mt-6 flex space-x-4">
                <a
                  href={`mailto:${member.email}`}
                  className="px-4 py-2 bg-gradient-to-r from-gray-800 to-black text-white rounded-full hover:from-gray-700 hover:to-gray-900 transition-all duration-300 flex items-center shine-button border border-gray-700"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    ></path>
                  </svg>
                  Email
                </a>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-gradient-to-r from-black to-gray-800 text-white rounded-full hover:from-black hover:to-gray-700 transition-all duration-300 flex items-center shine-button border border-gray-700"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z"></path>
                  </svg>
                  LinkedIn
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-black p-6 md:p-10 ml-24">
      <motion.h1
        className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-gray-400 tracking-wider"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        Meet Our Module Team
      </motion.h1>

      <motion.p
        className="text-gray-300 text-center mb-12 max-w-3xl mx-auto text-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        Our experienced team of lecturers is dedicated to guiding you through
        your software development journey. Feel free to reach out to any team
        member for support and guidance.
      </motion.p>

      {renderTeamSection(vlHybrid, "VL Hybrid Lecturers")}
      {renderTeamSection(ftHybrid, "Full-Time Hybrid Lecturers")}
      {renderTeamSection(vlOnline, "VL Online Lecturers")}

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Add a subtle glow effect to the cards on hover */
        .hover\\:shadow-white\\/30:hover {
          box-shadow: 0 0 30px 5px rgba(255, 255, 255, 0.3);
        }

        @keyframes shine {
          0% {
            background-position: -100% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }

        .shine-border {
          position: relative;
          overflow: hidden;
        }

        .shine-border::after {
          content: "";
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.2),
            transparent
          );
          background-size: 200% 100%;
          animation: shine 2s infinite;
        }

        .shine-button {
          position: relative;
          overflow: hidden;
          font-weight: 600;
        }

        .shine-button::after {
          content: "";
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.15),
            transparent
          );
          background-size: 200% 100%;
          animation: shine 3s infinite;
          z-index: 1;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
};

export default ModuleTeam;
