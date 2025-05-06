import { ThemeProvider } from "@/components/Providers/ThemeProvider";
import { NavBar } from "@/components/NavBar";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { Toaster } from "sonner";
import { CustomCursor } from "@/components/Cursor";
import Footer from "@/components/Footer";

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
    icon: "/iconw.png",
  },
  openGraph: {
    title: "SDGP",
    description: "Where Your Future is Shaped",
    url: "https://sdgp.lk", 
    siteName: "SDGP",
    images: [
      {
        url: "/iconw.png",
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
    images: ["/iconw.png"],
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
        <link rel="icon" href="/iconw.png" type="image/png" sizes="128x128" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
        <Toaster />
        <NavBar/>
        <div className="md:mx-24">
        {children}
        </div>
        <CustomCursor />
        <Footer/>
        </ThemeProvider>
      </body>
    
    </html>
 
  );
}
