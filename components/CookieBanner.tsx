// components/CookieBanner.tsx
'use client';
import React, { useState, useEffect } from 'react';

interface CookieConsentData {
  choice: 'accepted' | 'rejected';
  timestamp: number;
  expiry: number;
}

const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const cookieConsent = getCookieConsent();
    if (!cookieConsent) {
      setTimeout(() => {
        setShowBanner(true);
        setTimeout(() => setIsVisible(true), 100);
      }, 1000);
    }
  }, []);

  const getCookieConsent = (): string | null => {
    try {
      const consent = localStorage.getItem('cookieConsent');
      if (consent) {
        const data: CookieConsentData = JSON.parse(consent);
        const now = new Date().getTime();
        if (now > data.expiry) {
          localStorage.removeItem('cookieConsent');
          return null;
        }
        return data.choice;
      }
    } catch (error) {
      console.error('Error reading cookie consent:', error);
    }
    return null;
  };

  const setCookieConsent = (choice: 'accepted' | 'rejected'): void => {
    try {
      const now = new Date().getTime();
      const expiry = now + (30 * 24 * 60 * 60 * 1000); // 30 days
      const consentData: CookieConsentData = {
        choice: choice,
        timestamp: now,
        expiry: expiry
      };
      localStorage.setItem('cookieConsent', JSON.stringify(consentData));
    } catch (error) {
      console.error('Error saving cookie consent:', error);
    }
  };

  const handleAccept = () => {
    setCookieConsent('accepted');
    closeBanner();
  };

  const handleDecline = () => {
    setCookieConsent('rejected');
    closeBanner();
  };

  const closeBanner = () => {
    setIsVisible(false);
    setTimeout(() => setShowBanner(false), 300);
  };

  if (!showBanner) return null;

  return (
    <div className={`fixed bottom-4 left-4 right-4 md:bottom-6 md:left-1/2 md:right-auto md:transform md:-translate-x-1/2 md:max-w-2xl z-50 transition-all duration-300 ease-out ${
      isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-4 opacity-0 scale-95'
    }`}>
      <div className="bg-black/90 backdrop-blur-md rounded-xl shadow-2xl border border-gray-800/50 px-4 py-2.5 h-12">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="flex-shrink-0">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-400">
                <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"/>
                <path d="M8.5 8.5a2.5 2.5 0 0 1 5 0"/>
                <path d="M16 15.5a2.5 2.5 0 1 1-5 0"/>
              </svg>
            </div>
            <p className="text-gray-300 text-xs md:text-sm leading-tight truncate">
              We use cookies to personalize your site experience and analyze traffic.
            </p>
          </div>
          
          <div className="flex items-center gap-2 md:gap-3 flex-shrink-0 ml-3">
            <button
              onClick={handleDecline}
              className="text-gray-400 hover:text-gray-200 text-xs md:text-sm font-medium transition-colors duration-200 px-2 md:px-3 py-1 rounded-md hover:bg-gray-800/50"
            >
              Decline
            </button>
            
            <button
              onClick={handleAccept}
              className="bg-blue-600 hover:bg-blue-500 text-white text-xs md:text-sm font-medium px-3 md:px-4 py-1 rounded-md transition-all duration-200 transform hover:scale-105 active:scale-95"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;