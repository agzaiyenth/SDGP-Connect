// components/CookieBanner.tsx
'use client';
import React, { useState, useEffect } from 'react';

interface CookieConsentData {
  choice: 'accepted' | 'rejected';
  timestamp: number;
  expiry: number;
}
