import { useState, useEffect } from 'react';

const LANG_KEY = 'app_language';
const defaultLang = 'en';
const supportedLangs = ['en', 'si', 'th'];

export function useLanguage() {
  const [lang, setLang] = useState<string>(defaultLang);
  const [t, setT] = useState<Record<string, string>>({});

  useEffect(() => {
    const stored = localStorage.getItem(LANG_KEY);
    if (stored && supportedLangs.includes(stored)) {
      setLang(stored);
    }
  }, []);

  useEffect(() => {
    import(`../locales/${lang}.json`).then((mod) => setT(mod.default || mod));
    localStorage.setItem(LANG_KEY, lang);
  }, [lang]);

  const changeLanguage = (l: string) => {
    if (supportedLangs.includes(l)) setLang(l);
  };

  return { lang, t, changeLanguage };
}
