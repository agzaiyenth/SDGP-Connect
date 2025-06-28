// Copyright (c) 2025, Psycode Lab's (https://www.psycodelabs.lk). All Rights Reserved.
//
// This software is the property of Psycode Lab's. and its suppliers, if any.
// Dissemination of any information or reproduction of any material contained
// herein in any form is strictly forbidden, unless permitted by Psycode Lab's expressly.
// You may not alter or remove any copyright or other notice from copies of this content.
"use client"
import { Hero7 } from "../modern-hero";
import { useLanguage } from "@/hooks/LanguageProvider";

function getNested(obj: any, path: string[], fallback: any = undefined) {
  return path.reduce(
    (acc, key) => (acc && acc[key] !== undefined ? acc[key] : fallback),
    obj
  );
}

const Data = {
  heading: "More than just an academic module",
  description:
    "SDGP is a core academic module at IIT that redefines student learning by immersing them in real-world challenges. Through a blend of innovation, collaboration, and hands-on experience, it goes beyond traditional classroom education equipping students with practical skills, critical thinking, and a problem-solving mindset to create meaningful impact in society.",
  button: {
    text: "Discover more",
    url: "/about",
  },
  reviews: {
    count: 250,
    avatars: [
      {
        src: "/home/about-logo/raspberry.webp",
        alt: "Avatar 1",
      },
      {
        src: "/home/about-logo/amor.webp",
        alt: "Avatar 2",
      },
      {

        src: "/home/about-logo/lexi.webp",
        alt: "Avatar 3",
      },
      {
        src: "/home/about-logo/sealanka.webp",
        alt: "Avatar 4",
      },
      {
        src: "/assets/spark.webp",
        alt: "Avatar 4",
      },
      {
        src: "/home/about-logo/movemate.webp",
        alt: "Avatar 5",
      },
    ],
  },
};

function About() {
  const { t } = useLanguage();
  const homeCta = getNested(t, ["home", "cta"], {});
  const Data = {
    heading: homeCta.heading || "More than just an academic module",
    description:
      homeCta.description ||
      "SDGP is a core academic module at IIT that redefines student learning by immersing them in real-world challenges. Through a blend of innovation, collaboration, and hands-on experience, it goes beyond traditional classroom education equipping students with practical skills, critical thinking, and a problem-solving mindset to create meaningful impact in society.",
    button: {
      text: homeCta.button || "Discover more",
      url: "/about",
    },
    reviews: {
      count: 250,
      avatars: [
        {
          src: "/home/about-logo/raspberry.webp",
          alt: "Avatar 1",
        },
        {
          src: "/home/about-logo/amor.webp",
          alt: "Avatar 2",
        },
        {
          src: "/home/about-logo/lexi.webp",
          alt: "Avatar 3",
        },
        {
          src: "/home/about-logo/sealanka.webp",
          alt: "Avatar 4",
        },
        {
          src: "/assets/spark.webp",
          alt: "Avatar 4",
        },
        {
          src: "/home/about-logo/movemate.webp",
          alt: "Avatar 5",
        },
      ],
    },
  };
  return <Hero7 {...Data} />;
}

export { About };
