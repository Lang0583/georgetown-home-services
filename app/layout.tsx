import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import StickyHeader from "../components/StickyHeader";
import SiteFooter from "../components/SiteFooter";
import JsonLd from "../components/JsonLd";
import { ADSENSE_CLIENT_ID } from "../lib/adsense-config";
import { getBrandName } from "../lib/site-content";

const siteUrl = process.env.SITE_URL ?? "https://www.georgetownhomeservices.com";

const adsenseScriptSrc = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`;

/** Set in `.env.local` after you get your Grow site ID from Mediavine (app.mediavine.com/grow). */
const mediavineGrowSiteId = process.env.NEXT_PUBLIC_MEDIAVINE_GROW_SITE_ID;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: "Georgetown Home Services",
      template: "%s | Georgetown Home Services",
    },
    description: "Local plumbing, HVAC, and roofing service in Georgetown, TX.",
    robots: { index: true, follow: true },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const brand = getBrandName();
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: brand,
    url: siteUrl,
    description:
      "A local directory and homeowner guide for trusted home service companies in Georgetown, Texas, covering plumbing, HVAC, roofing, electrical, landscaping, pest control, foundation repair, and house cleaning.",
    knowsAbout: [
      "Plumbing",
      "HVAC",
      "Roofing",
      "Electrical",
      "Landscaping",
      "Pest control",
      "Foundation repair",
      "House cleaning",
    ],
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: brand,
    url: siteUrl,
    // SearchAction is omitted because the site does not currently provide on-site search.
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full text-gray-900 antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://googleads.g.doubleclick.net" />
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
        {process.env.NODE_ENV === "production" ? (
          <link rel="preconnect" href="https://www.googletagmanager.com" />
        ) : null}
        <Script
          id="google-adsense"
          src={adsenseScriptSrc}
          strategy="afterInteractive"
          async
          crossOrigin="anonymous"
        />
        {mediavineGrowSiteId ? (
          <Script
            id="mediavine-grow"
            src={`https://uploads.mediavine.com/grow/${mediavineGrowSiteId}.js`}
            strategy="lazyOnload"
          />
        ) : null}
      </head>
      <body className="min-h-full flex flex-col bg-gray-50 text-gray-900">
        <JsonLd data={organizationJsonLd} />
        <JsonLd data={websiteJsonLd} />
        <StickyHeader />
        <main className="flex-1 pt-20">{children}</main>
        <SiteFooter />
      </body>
      {process.env.NODE_ENV === "production" ? (
        <GoogleAnalytics gaId="G-PLACEHOLDER" />
      ) : null}
    </html>
  );
}
