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
import CookieBanner from "@/components/CookieBanner"
import { usePathname } from "next/navigation";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();
  const pathname = usePathname();
  
  // Pages that should not have horizontal margins
  const fullWidthPages = ['/contribute'];
  const shouldHaveMargins = !fullWidthPages.includes(pathname);

  return (
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
    </ThemeProvider>
  );
}
