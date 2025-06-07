"use client";

import { Toaster } from "sonner";
import { CustomCursor } from "@/components/Cursor";
import { NavBar } from "@/components/NavBar";
import Footer from "@/components/Footer";
import useIsMobile from "@/hooks/useIsMobile";
import { ThemeProvider } from "@/components/Providers/ThemeProvider";
import { Analytics } from "@vercel/analytics/next";
import { ExpandableChatAI } from "@/components/ai/ExpandableChatAI";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <NavBar />
      <div className="md:mx-24">{children}</div>
      {!isMobile && <CustomCursor />}
      <Footer />
      <Analytics />
      <Toaster />
      <ExpandableChatAI />
    </ThemeProvider>
  );
}
