import type { Metadata } from "next";
import "@/styles/globals.css";
import { GeistSans } from "geist/font";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "sonner";
import { siteConfig } from "@/config/site";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

import { Providers } from "@/components/providers/providers";

export const metadata: Metadata = {
  manifest: "/manifest.json",
  title: siteConfig.title,
  description: siteConfig.url,
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/favicon-light.ico",
        href: "/favicon-light.ico",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/favicon-dark.ico",
        href: "/favicon-dark.ico",
      },
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.title,
  },
  metadataBase: new URL(siteConfig.url),
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={GeistSans.className}>
        <Providers session={session}>{children}</Providers>
        <Toaster
          position="top-center"
          richColors
          theme="system"
          offset={16}
          duration={1500}
        />
        <Analytics />
      </body>
    </html>
  );
}
