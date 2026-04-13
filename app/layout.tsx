import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { headers } from "next/headers";
import "./globals.css";
import StickyHeader from "../components/StickyHeader";
import SiteFooter from "../components/SiteFooter";
import JsonLd from "../components/JsonLd";
import { getBrandName } from "../lib/site-content";

const siteUrl = process.env.SITE_URL ?? "https://www.georgetownhomeservices.com";

const adsenseClientId = "ca-pub-2692091044925789";
const adsenseScriptSrc = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClientId}`;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const h = await headers();
  const pathname = h.get("x-pathname") || "/";
  const canonical = `https://www.georgetownhomeservices.com${pathname}`;

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: "Georgetown Home Services",
      template: "%s | Georgetown Home Services",
    },
    description: "Local plumbing, HVAC, and roofing service in Georgetown, TX.",
    robots: { index: true, follow: true },
    alternates: { canonical },
    openGraph: {
      url: canonical,
    },
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
      "A local directory and homeowner guide for comparing plumbers, HVAC companies, and roofers in Georgetown, Texas.",
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
      <body className="min-h-full flex flex-col bg-gray-50 text-gray-900">
        <Script
          async
          src={adsenseScriptSrc}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <JsonLd data={organizationJsonLd} />
        <JsonLd data={websiteJsonLd} />
        <StickyHeader />
        <main className="flex-1 pt-20">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
