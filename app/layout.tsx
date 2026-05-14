import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/ui/LenisProvider";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { HUD } from "@/components/ui/HUD";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { PaletteTrigger } from "@/components/ui/PaletteTrigger";
import { ConsoleSignature } from "@/components/ui/ConsoleSignature";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// Temporary: using Vercel deployment URL until custom domain is confirmed
const siteUrl = "https://portfolio-chi-ivory-84.vercel.app";

const DESCRIPTION =
  "Frontend-focused software engineer and Computer Science student at Tec de Monterrey building interactive web experiences with React, Next.js, TypeScript, and modern frontend systems.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Santiago's Portfolio",
    template: "%s | Santiago Arias Paul",
  },
  description: DESCRIPTION,
  keywords: [
    "frontend engineer",
    "software engineer",
    "Next.js",
    "React",
    "TypeScript",
    "Tec de Monterrey",
    "portfolio",
    "Santiago Arias Paul",
  ],
  authors: [{ name: "Santiago Arias Paul", url: siteUrl }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Santiago Arias Paul",
    title: "Santiago Arias Paul — Frontend-focused Software Engineer",
    description: DESCRIPTION,
    images: [{ url: `${siteUrl}/opengraph-image`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Santiago Arias Paul — Frontend-focused Software Engineer",
    description: DESCRIPTION,
    images: [`${siteUrl}/opengraph-image`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Santiago Arias Paul",
  url: siteUrl,
  jobTitle: "Frontend-focused Software Engineer",
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Tec de Monterrey",
  },
  sameAs: ["https://github.com/SantiagoArias07"],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body>
        <LenisProvider>
          <CustomCursor />
          <HUD />
          <CommandPalette />
          <PaletteTrigger />
          <ConsoleSignature />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
