import type { Metadata } from "next";
import type { ReactNode } from "react";
import { RootProvider } from "fumadocs-ui/provider/next";
import { Inter } from "next/font/google";
import BunSearchDialog from "@/components/search-dialog";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: { default: "BunUI", template: "%s | BunUI" },
  description: "Beautiful by default. Customizable by design.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html suppressHydrationWarning lang="en" className={inter.variable} data-scroll-behavior="smooth">
      <body className="flex min-h-screen flex-col font-sans">
        <RootProvider search={{ SearchDialog: BunSearchDialog }}>{children}</RootProvider>
      </body>
    </html>
  );
}
