import React from 'react';
import Image from "next/image";

interface ItemDisplayBaseProps {
  name: string;
  image: string;
  getFallbackImage: (name: string) => string;
}

interface ItemDisplayProps extends ItemDisplayBaseProps {
  subtitle?: string;
  size?: 'small' | 'large';
}

export const ItemDisplay = ({
  name,
  image,
  subtitle,
  size = 'large',
  getFallbackImage
}: ItemDisplayProps) => {
  const isSmall = size === 'small';
  
  return (
    <div className="flex min-w-80 items-center gap-3">
      <div className={`relative ${isSmall ? 'h-6 w-6' : 'h-10 w-10'} overflow-hidden rounded-md`}>
        <Image
          src={image}
          alt={name}
          width={isSmall ? 24 : 40}
          height={isSmall ? 24 : 40}
          className="object-cover"
          onError={(e) => {
            e.currentTarget.src = getFallbackImage(name);
          }}
        />
      </div>
      <div className="flex flex-col">
        <div className="font-medium">{name}</div>
        {subtitle && (
          <div className="text-xs text-muted-foreground">
            {subtitle}
          </div>
        )}
      </div>
    </div>
  );
};
