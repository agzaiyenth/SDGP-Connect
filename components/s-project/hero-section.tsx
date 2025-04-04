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
        <img
          src={coverImage || "https://picsum.photos/800/450?random=6"}
          alt="Project Cover"
          className="w-full h-full object-cover"
        />
      }
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
      
    </div>
  );
};
