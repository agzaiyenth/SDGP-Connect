import Image from "next/image";
import React from "react";

interface HeroSectionProps {
  coverImage: string | undefined;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  coverImage,
}) => {
  return (
    <div className="relative w-full h-[70vh] min-h-[500px]">
      {
        <Image
          fill
          src={coverImage || "https://placehold.co/600x400/png?text=NO+IMAGE"}
          alt="Project Cover"
          className="w-full h-full object-cover"
        />
      }
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
      
    </div>
  );
};
