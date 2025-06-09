import { Hero7 } from "../modern-hero";


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
        src: "/home/about-logo/raspberry.jpg",
        alt: "Avatar 1",
      },
      {
        src: "/home/about-logo/amor.png",
        alt: "Avatar 2",
      },
      {
        
        src: "/home/about-logo/lexi.png",
        alt: "Avatar 3",
      },
      {
        src: "/home/about-logo/sealanka.jpg",
        alt: "Avatar 4",
      },
      {
        src: "/assets/spark.png",
        alt: "Avatar 4",
      },
      {
        src: "/home/about-logo/movemate.jpg",
        alt: "Avatar 5",
      },
    ],
  },
};

function About() {
  return <Hero7 {...Data} />;
}

export { About };
