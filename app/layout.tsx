import type { Metadata } from "next";
import "@/styles/globals.css";
import { GeistSans } from "geist/font";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "sonner";

import { Providers } from "@/components/providers/providers";

export const metadata: Metadata = {
  title: "Tiny Changes",
  description: "Tiny Changes, Remarkable Results.",
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
