import type { Metadata } from "next";
import type { ReactNode } from "react";
import { RootProvider } from "fumadocs-ui/provider/next";
import { Fredoka, Inter } from "next/font/google";
import { ClickSpark } from "@/components/click-spark";
import BunSearchDialog from "@/components/search-dialog";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const fredoka = Fredoka({ subsets: ["latin"], variable: "--font-fredoka" });

export const metadata: Metadata = {
  title: { default: "BunUI", template: "%s | BunUI" },
  description: "Beautiful by default. Customizable by design.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={`${inter.variable} ${fredoka.variable}`}
      data-scroll-behavior="smooth"
    >
      <body className="flex min-h-screen flex-col font-sans">
        <ClickSpark sparkRadius={18} sparkCount={10}>
          <RootProvider search={{ SearchDialog: BunSearchDialog }}>{children}</RootProvider>
        </ClickSpark>
      </body>
    </html>
  );
}
