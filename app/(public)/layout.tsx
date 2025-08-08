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
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
        <link rel="icon" href="/iconw.svg" type="image/png" sizes="128x128" />
        <link
          rel="preload"
          href="/iconw.svg"
          as="image"
          type="image/svg+xml"
        />
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Geist:wght@400;700&display=swap"
          as="style"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Geist:wght@400;700&display=swap"
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
