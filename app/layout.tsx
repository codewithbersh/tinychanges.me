import type { Metadata } from "next";
import "@/styles/globals.css";

import { GeistSans } from "geist/font";

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
      <body className={GeistSans.className}>{children}</body>
    </html>
  );
}
