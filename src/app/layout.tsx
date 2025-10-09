import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ZDT's Adventure Plaza | Community Entertainment Hub in Seguin, TX",
  description: "Supporting small businesses and community entertainment in Seguin, Texas. Premium commercial spaces available for entertainment venues, family attractions, and local entrepreneurs.",
  keywords: ["commercial real estate Seguin TX", "entertainment space for lease", "community entertainment hub", "Seguin Texas business space", "warehouse space Seguin"],
  authors: [{ name: "ZDT's Adventure Plaza" }],
  creator: "ZDT's Adventure Plaza",
  publisher: "ZDT's Adventure Plaza",
  metadataBase: new URL("https://www.zdtsadventureplaza.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.zdtsadventureplaza.com",
    title: "ZDT's Adventure Plaza | Community Entertainment Hub in Seguin, TX",
    description: "Supporting small businesses and community entertainment in Seguin, Texas. Premium commercial spaces available for entertainment venues, family attractions, and local entrepreneurs.",
    siteName: "ZDT's Adventure Plaza",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ZDT's Adventure Plaza - Community Entertainment Hub in Seguin, TX",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ZDT's Adventure Plaza | Community Entertainment Hub in Seguin, TX",
    description: "Supporting small businesses and community entertainment in Seguin, Texas. Premium commercial spaces available for entertainment venues.",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add Google Search Console verification code here when available
    // google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "ZDT's Adventure Plaza",
    "description": "Community entertainment hub and commercial real estate in Seguin, Texas. Supporting local small businesses and family entertainment.",
    "url": "https://www.zdtsadventureplaza.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "1115 N Bowie St",
      "addressLocality": "Seguin",
      "addressRegion": "TX",
      "postalCode": "78155",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 29.5785,
      "longitude": -97.9614
    },
    "areaServed": {
      "@type": "City",
      "name": "Seguin",
      "containedIn": {
        "@type": "State",
        "name": "Texas"
      }
    },
    "priceRange": "$$",
    "image": "https://www.zdtsadventureplaza.com/images/og-image.jpg",
    "sameAs": [
      // Add social media profiles here when available
      // "https://www.facebook.com/zdtsadventureplaza",
      // "https://www.instagram.com/zdtsadventureplaza",
    ]
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-XXXXXXXXXX"} />
      </body>
    </html>
  );
}
