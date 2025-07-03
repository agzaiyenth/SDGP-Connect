import Image from "next/image";
import Link from "next/link";
import React from "react";

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
        alt="logo"
        height={450}
        width="650"
        className="transition-transform hover:scale-105 w-48  sm:w-32  sm:h-24 md:w-38 lg:w-38 "
      />
    </Link>
  </div>
);

export default BadgeComponent;
