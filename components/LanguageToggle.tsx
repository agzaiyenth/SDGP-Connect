'use client'
import React from 'react';
import { useLanguage } from '../hooks/LanguageProvider';

const langs = [
  { code: 'en', label: 'EN' },
  { code: 'si', label: 'සිං' },
  { code: 'th', label: 'TH' },
];

export default function LanguageToggle() {
  const { lang, changeLanguage } = useLanguage();
  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 bg-white/90 rounded-l-3xl shadow-lg p-2 flex flex-col items-center gap-2">
      {langs.map(l => (
        <button
          key={l.code}
          onClick={() => changeLanguage(l.code)}
          className={`w-9 h-9 font-bold rounded-full border-none outline-none transition-colors duration-200 cursor-pointer flex items-center justify-center ${
            lang === l.code
              ? 'bg-blue-600 text-white'
              : 'bg-transparent text-gray-800 hover:bg-blue-100'
          }`}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
