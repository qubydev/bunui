import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Inter, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import GooeyNavbar from "@/components/GooeyNavbar";
import {
  SITE_AUTHOR,
  SITE_DOMAIN,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_SHORT_NAME,
  SITE_TAGLINE,
  SITE_URL,
} from "@/lib/site";
import {
  absoluteUrl,
  SITE_APP_ICON,
  SITE_KEYWORDS,
  SITE_LOGO_IMAGE,
  SITE_OG_IMAGE,
  SITE_TWITTER_IMAGE,
  siteJsonLd,
} from "@/lib/seo";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const openRunde = localFont({
  variable: "--font-open-runde",
  src: [
    {
      path: "../public/fonts/OpenRunde-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/OpenRunde-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/OpenRunde-Semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/OpenRunde-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TAGLINE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_AUTHOR.name, url: SITE_AUTHOR.url }],
  creator: SITE_AUTHOR.name,
  publisher: SITE_NAME,
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  category: "technology",
  classification:
    "Open-source animated React components, Tailwind CSS components, shadcn registry",
  alternates: {
    canonical: "/",
  },
  manifest: "/manifest.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: absoluteUrl("/logos/Bunui.svg"), type: "image/svg+xml" },
      { url: absoluteUrl("/favicon.ico"), sizes: "any" },
      {
        url: absoluteUrl("/icon-192.png"),
        sizes: "192x192",
        type: "image/png",
      },
      { url: absoluteUrl(SITE_APP_ICON), sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: absoluteUrl("/apple-touch-icon.png"), sizes: "180x180" }],
  },
  openGraph: {
    title: SITE_TAGLINE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: absoluteUrl(SITE_OG_IMAGE),
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} animated React component library`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TAGLINE,
    description: SITE_DESCRIPTION,
    creator: SITE_AUTHOR.handle,
    site: SITE_AUTHOR.handle,
    images: [absoluteUrl(SITE_TWITTER_IMAGE)],
  },
  other: {
    "og:logo": absoluteUrl(SITE_LOGO_IMAGE),
    "application-name": SITE_SHORT_NAME,
    "apple-mobile-web-app-title": SITE_SHORT_NAME,
    "msapplication-TileImage": absoluteUrl("/mstile-150x150.png"),
    "msapplication-TileColor": "#0b0b0f",
    "theme-color": "#0b0b0f",
    "twitter:domain": SITE_DOMAIN,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`dark ${inter.variable} ${geistMono.variable} ${openRunde.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
try {
  var theme = localStorage.getItem("bunui-theme");
  document.documentElement.classList.toggle("dark", theme ? theme === "dark" : true);
} catch {}
`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd()) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <GooeyNavbar />
        <div className="flex flex-1 flex-col">{children}</div>
        <Analytics />
      </body>
    </html>
  );
}
