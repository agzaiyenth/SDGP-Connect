'use client'
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

const LANG_KEY = 'app_language';
const defaultLang = 'en';
const supportedLangs = ['en', 'si', 'th'];

interface LanguageContextProps {
  lang: string;
  t: Record<string, string>;
  changeLanguage: (l: string) => void;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<string>(defaultLang);
  const [t, setT] = useState<Record<string, string>>({});
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(LANG_KEY);
    if (stored && supportedLangs.includes(stored)) {
      setLang(stored);
    } else {
      setLang(defaultLang);
    }
    setIsLoaded(true);
  }, []);
  
  useEffect(() => {
    if (isLoaded) {
      import(`../locales/${lang}.json`)
        .then((mod) => setT(mod.default || mod))
        .catch(() => setT({}));
      localStorage.setItem(LANG_KEY, lang);
    }
  }, [lang, isLoaded]);

  const changeLanguage = (l: string) => {
    if (supportedLangs.includes(l)) setLang(l);
  };

  return (
    <LanguageContext.Provider value={{ lang, t, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
