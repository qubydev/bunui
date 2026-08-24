import type { Metadata } from "next";
import type { ReactNode } from "react";
import { RootProvider } from "fumadocs-ui/provider/next";
import { Fredoka, Inter } from "next/font/google";
import { ClickSpark } from "@/components/click-spark";
import BunSearchDialog from "@/components/search-dialog";
import {ThemeProvider} from "@/components/theme-provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const fredoka = Fredoka({ subsets: ["latin"], variable: "--font-fredoka" });

export const metadata: Metadata = {
  title: { default: "BunUI", template: "%s | BunUI" },
  description: "Beautiful by default. Customizable by design.",
};

const themeScript = `
(() => {
  try {
    const theme = localStorage.getItem("theme") || "system";
    const resolved = theme === "system"
      ? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
      : theme;
    const root = document.documentElement;

    root.classList.toggle("dark", resolved === "dark");
    root.dataset.theme = resolved;
    root.style.colorScheme = resolved;
  } catch {}
})();
`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={`${inter.variable} ${fredoka.variable}`}
      data-scroll-behavior="smooth"
    >
      <head>
        <script suppressHydrationWarning dangerouslySetInnerHTML={{__html: themeScript}} />
      </head>
      <body className="flex min-h-screen flex-col font-sans">
        <RootProvider
          search={{ SearchDialog: BunSearchDialog }}
          theme={{enabled: false}}
        >
          <ThemeProvider>
            <ClickSpark sparkRadius={18} sparkCount={10}>
              {children}
            </ClickSpark>
          </ThemeProvider>
        </RootProvider>
      </body>
    </html>
  );
}
