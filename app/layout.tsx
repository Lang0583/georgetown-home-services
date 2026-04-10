import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StickyHeader from "../components/StickyHeader";
import SiteFooter from "../components/SiteFooter";
import JsonLd from "../components/JsonLd";
import CanonicalFromPathname from "../components/CanonicalFromPathname";
import { getBrandName } from "../lib/site-content";

const siteUrl = process.env.SITE_URL ?? "https://www.georgetownhomeservices.com";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Georgetown Home Services",
    template: "%s | Georgetown Home Services",
  },
  description: "Local plumbing, HVAC, and roofing service in Georgetown, TX.",
  robots: { index: true, follow: true },
  openGraph: {
    title: "Georgetown Home Services",
    description: "Local plumbing, HVAC, and roofing service in Georgetown, TX.",
    type: "website",
    url: siteUrl,
  },
};

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
        <CanonicalFromPathname />
        <JsonLd data={organizationJsonLd} />
        <JsonLd data={websiteJsonLd} />
        <StickyHeader />
        <main className="flex-1 pt-20">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
