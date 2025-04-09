import { Hero7 } from "../modern-hero";


const demoData = {
  heading: "More than Just an academic module",
  description:
    "SDGP Module has shaped the academic landscape by providing students with a unique opportunity to engage with real-world challenges. This module not only enhances their academic experience but also equips them with the skills and knowledge needed to make a positive impact in society.",
  button: {
    text: "Discover more",
    url: "/about",
  },
  reviews: {
    count: 200,
    avatars: [
      {
        src: "/Lexi/icon.png",
        alt: "Avatar 1",
      },
      {
        src: "https://www.shadcnblocks.com/images/block/avatar-2.webp",
        alt: "Avatar 2",
      },
      {
        src: "https://www.shadcnblocks.com/images/block/avatar-3.webp",
        alt: "Avatar 3",
      },
      {
        src: "https://www.shadcnblocks.com/images/block/avatar-4.webp",
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
  return <Hero7 {...demoData} />;
}

export { About };
