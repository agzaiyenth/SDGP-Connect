/* Copyright (c) 2025, the contributors of the SDGP Connect project. All Rights Reserved.

This software is the joint property of the contributors to the SDGP Connect project.
Unauthorized distribution, commercial use, or reproduction of any part of this material
in any form is strictly prohibited without the explicit written consent of all contributors.
You may not alter or remove any copyright or attribution notice from this content. */

import ClientLayout from "@/components/Clientlayout";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap", // Improve font loading performance
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap", // Improve font loading performance
  preload: true,
});

export const metadata: Metadata = {
  title: "SDGP",
  description: "Where Your Future is Shaped",
  icons: {
    icon: "/iconw.svg",
  },
  openGraph: {
    title: "SDGP",
    description: "Where Your Future is Shaped",
    url: "https://sdgp.lk",
    siteName: "SDGP",
    images: [
      {
        url: "/image.png",
        width: 1200,
        height: 630,
        alt: "SDGP Cover Image",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SDGP",
    description: "Where Your Future is Shaped",
    images: ["/image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/iconw.svg" type="image/svg+xml" />
        <link rel="preload" href="/iconw.svg" as="image" type="image/svg+xml" />
        {/* Remove external font loading - using Next.js font optimization instead */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* Preload critical resources */}
        <link rel="preload" href="/test.svg" as="image" type="image/svg+xml" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
