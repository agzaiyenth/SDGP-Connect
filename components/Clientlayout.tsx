/* Copyright (c) 2025, the contributors of the SDGP Connect project. All Rights Reserved.

This software is the joint property of the contributors to the SDGP Connect project.
Unauthorized distribution, commercial use, or reproduction of any part of this material
in any form is strictly prohibited without the explicit written consent of all contributors.
You may not alter or remove any copyright or attribution notice from this content. */

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
