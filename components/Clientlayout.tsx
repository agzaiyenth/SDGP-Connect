// Copyright (c) 2025, Psycode Lab's (https://www.psycodelabs.lk). All Rights Reserved.
//
// This software is the property of Psycode Lab's. and its suppliers, if any.
// Dissemination of any information or reproduction of any material contained
// herein in any form is strictly forbidden, unless permitted by Psycode Lab's expressly.
// You may not alter or remove any copyright or other notice from copies of this content.
"use client";

import { Toaster } from "sonner";
import { CustomCursor } from "@/components/Cursor";
import { NavBar } from "@/components/NavBar";
import Footer from "@/components/Footer";
import useIsMobile from "@/hooks/useIsMobile";
import { ThemeProvider } from "@/components/Providers/ThemeProvider";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { ExpandableChatAI } from "@/components/ai/ExpandableChatAI";
import { LanguageProvider } from "@/hooks/LanguageProvider";
import LanguageToggle from "@/components/LanguageToggle";
import CookieBanner from '@/components/CookieBanner'

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();

  return (
    <LanguageProvider>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
        <NavBar />
        <div className="md:mx-24">{children}</div>
        {!isMobile && <CustomCursor />}
        <Footer />
        <CookieBanner />
        <Analytics />
        <SpeedInsights />
        <Toaster />
        <ExpandableChatAI />
        <LanguageToggle />
      </ThemeProvider>
    </LanguageProvider>
  );
}
