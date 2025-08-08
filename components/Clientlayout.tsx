/* Copyright (c) 2025, the contributors of the SDGP Connect project. All Rights Reserved.

This software is the joint property of the contributors to the SDGP Connect project.
Unauthorized distribution, commercial use, or reproduction of any part of this material
in any form is strictly prohibited without the explicit written consent of all contributors.
You may not alter or remove any copyright or attribution notice from this content. */

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
import CookieBanner from "@/components/CookieBanner"
import { usePathname } from "next/navigation";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();
  const pathname = usePathname();
  
  // Pages that should not have horizontal margins
  const fullWidthPages = ['/contribute'];
  const shouldHaveMargins = !fullWidthPages.includes(pathname);

  return (
    <LanguageProvider>
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
        <LanguageToggle />
      </ThemeProvider>
    </LanguageProvider>
  );
}
