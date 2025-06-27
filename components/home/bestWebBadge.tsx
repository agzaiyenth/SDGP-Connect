import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const BadgeComponent: React.FC = () => (
  <div className="fixed z-50 shadow-lg rounded-lg overflow-hidden top-5 right-5 md:top-10 md:right-10">
    <Link
      href="https://ebadge.bestweb.lk/api/v1/clicked/sdgp.lk/BestWeb/2025/Rate_Us"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Image
        src="https://ebadge.bestweb.lk/eBadgeSystem/domainNames/sdgp.lk/BestWeb/2025/Rate_Us/image.png"
        alt="BestWeb Badge"
        width={144}
        height={144}
        sizes="(max-width: 768px) 96px, 144px"
        className="transition-transform hover:scale-105 w-24 h-24 md:w-36 md:h-36"
        priority
      />
    </Link>
  </div>
);

export default BadgeComponent;
