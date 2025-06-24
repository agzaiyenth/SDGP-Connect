'use client';

import React from 'react';
import { useLanguage } from '../../hooks/LanguageProvider';

export default function SampleMultilingual() {
  const { t } = useLanguage();
  return (
    <div className="text-center my-8">
      <h2>{t.greeting}</h2>
      <p>{t.description}</p>
    </div>
  );
}
