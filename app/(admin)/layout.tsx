import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { ClientProviders } from "@/components/Providers/ClientProvider";
import type { Metadata } from "next";
import { getServerSession } from "next-auth/next";
import { Inter } from "next/font/google";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Modern admin dashboard built with Next.js",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ClientProviders session={session}>
          <DashboardLayout>{children}</DashboardLayout>
        </ClientProviders>
      </body>
    </html>
  );
}
