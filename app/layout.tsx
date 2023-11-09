import type { Metadata } from "next";
import "@/styles/globals.css";
import { GeistSans } from "geist/font";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "sonner";
import { siteConfig } from "@/config/site";

import { Providers } from "@/components/providers/providers";

export const metadata: Metadata = {
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={GeistSans.className}>
        <Providers>{children}</Providers>
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
