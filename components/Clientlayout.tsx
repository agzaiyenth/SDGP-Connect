// Copyright (c) 2025, Psycode Lab's (https://www.psycodelabs.lk). All Rights Reserved.
//
// This software is the property of Psycode Lab's. and its suppliers, if any.
// Dissemination of any information or reproduction of any material contained
// herein in any form is strictly forbidden, unless permitted by Psycode Lab's expressly.
// You may not alter or remove any copyright or other notice from copies of this content.
"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { Toaster } from "sonner";
import { NavBar } from "@/components/NavBar";
import Footer from "@/components/Footer";
import useIsMobile from "@/hooks/useIsMobile";
import { ThemeProvider } from "@/components/Providers/ThemeProvider";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { LanguageProvider } from "@/hooks/LanguageProvider";
import CookieBanner from "@/components/CookieBanner"
import { usePathname } from "next/navigation";

// Lazy load non-critical components for better performance
const CustomCursor = dynamic(() => import("@/components/Cursor").then(mod => ({ default: mod.CustomCursor })), { 
  ssr: false,
  loading: () => null
});

const ExpandableChatAI = dynamic(() => import("@/components/ai/ExpandableChatAI").then(mod => ({ default: mod.ExpandableChatAI })), {
  ssr: false,
  loading: () => null
});

const LanguageToggle = dynamic(() => import("@/components/LanguageToggle"), {
  ssr: false,
  loading: () => null
});

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();
  const pathname = usePathname();
  
  // Pages that should not have horizontal margins
  const fullWidthPages = ['/contribute'];
  const shouldHaveMargins = !fullWidthPages.includes(pathname);
  
  // Only enable LanguageProvider for home page
  const isHomePage = pathname === '/';

  const LayoutContent = () => (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <NavBar />
      <div className={shouldHaveMargins ? "md:mx-24" : ""}>{children}</div>
      {!isMobile && <CustomCursor />}
      <Footer />
      <CookieBanner />
      <Analytics />
      <SpeedInsights />
      <Toaster />
      <ExpandableChatAI />
      {isHomePage && <LanguageToggle />}
    </ThemeProvider>
  );

  return isHomePage ? (
    <LanguageProvider>
      <LayoutContent />
    </LanguageProvider>
  ) : (
    <LayoutContent />
  );
}
