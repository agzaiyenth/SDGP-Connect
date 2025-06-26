'use client';

import React from 'react';

const BadgeComponent: React.FC = () => (
  <div className="fixed z-50 shadow-lg rounded-lg overflow-hidden top-8 right-8 md:top-27 md:right-12">
    <a 
      href="https://ebadge.bestweb.lk/api/v1/clicked/sdgp.lk/BestWeb/2025/Rate_Us"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img 
        src="https://ebadge.bestweb.lk/eBadgeSystem/domainNames/sdgp.lk/BestWeb/2025/Rate_Us/image.png" 
        alt="BestWeb Badge" 
        width={120} 
        height={120}
        className="transition-transform hover:scale-105 w-24 h-24 md:w-36 md:h-36"
      />
    </a>
  </div>
);

export default BadgeComponent;
