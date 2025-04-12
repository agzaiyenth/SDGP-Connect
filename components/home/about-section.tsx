import { Hero7 } from "../modern-hero";


const Data = {
  heading: "More than Just an academic module",
  description:
    "SDGP Module has shaped the academic landscape by providing students with a unique opportunity to engage with real-world challenges. This module not only enhances their academic experience but also equips them with the skills and knowledge needed to make a positive impact in society.",
  button: {
    text: "Discover more",
    url: "/about",
  },
  reviews: {
    count: 250,
    avatars: [
      {
        src: "/home/about-logo/lexi.png",
        alt: "Avatar 1",
      },
      {
        src: "/home/about-logo/amor.png",
        alt: "Avatar 2",
      },
      {
        src: "/home/about-logo/raspberry.jpg",
        alt: "Avatar 3",
      },
      {
        src: "/home/about-logo/genie.png",
        alt: "Avatar 4",
      },
      {
        src: "https://www.shadcnblocks.com/images/block/avatar-5.webp",
        alt: "Avatar 5",
      },
    ],
  },
};

function About() {
  return <Hero7 {...Data} />;
}

export { About };
