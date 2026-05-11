import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/ui/LenisProvider";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { HUD } from "@/components/ui/HUD";

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

const siteUrl = "https://santiagoapaul.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Santiago Arias Paul — Frontend Engineer",
    template: "%s | Santiago Arias Paul",
  },
  description:
    "Frontend Engineer & Computer Technologies student at Tec de Monterrey. Fundación Gallagher scholar. Building interfaces that feel alive.",
  keywords: [
    "frontend engineer",
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
    title: "Santiago Arias Paul — Frontend Engineer",
    description:
      "Frontend Engineer & Computer Technologies student at Tec de Monterrey. Fundación Gallagher scholar.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Santiago Arias Paul — Frontend Engineer",
    description:
      "Frontend Engineer & Computer Technologies student at Tec de Monterrey.",
    images: ["/opengraph-image"],
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
  jobTitle: "Frontend Engineer",
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
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
