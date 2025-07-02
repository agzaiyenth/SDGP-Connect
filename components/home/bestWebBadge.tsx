import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const BadgeComponent: React.FC = () => (
  <div className="fixed z-50 shadow-lg rounded-lg overflow-hidden top-4 right-2 sm:top-5 sm:right-3 md:top-8 md:right-4 lg:top-10 lg:right-6 flex items-start justify-end">
    <Link
      href="https://ebadge.bestweb.lk/api/v1/clicked/sdgp.lk/BestWeb/2025/Rate_Us"
      target="_blank"
      rel="noopener noreferrer"
      className="block"
    >
      <Image
        src="https://ebadge.bestweb.lk/eBadgeSystem/domainNames/sdgp.lk/BestWeb/2025/Rate_Us/image.png"
        alt="BestWeb Badge"
        width={216}
        height={144}
        sizes="(max-width: 640px) 76px, (max-width: 768px) 96px, 144px"
        className="transition-transform hover:scale-105 w-19 h-19 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-36 lg:h-36"
        priority
      />
    </Link>
  </div>
);

export default BadgeComponent;
