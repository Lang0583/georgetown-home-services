import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import HomeHailAlertBanner from "../components/HomeHailAlertBanner";
import StickyHeader from "../components/StickyHeader";
import EmailCaptureSitewide from "../components/EmailCaptureSitewide";
import SiteFooter from "../components/SiteFooter";
import JsonLd from "../components/JsonLd";
import HomeFaqPageHeadJsonLd from "../components/HomeFaqPageHeadJsonLd";
import { getImpactPublisherTagInnerHtml } from "../lib/impact-publisher-tag";
import { organizationSchema, websiteSchema } from "../lib/schema";

const siteUrl = process.env.SITE_URL ?? "https://www.georgetownhomeservices.com";

/** impact.com / AppImpact “HTML tag” verification — paste the `content` value only (not the full tag). */
const impactSiteVerification =
  process.env.IMPACT_SITE_VERIFICATION?.trim() || "b1d76151-29e8-4a9a-9913-9ea8f5ce9cd9";

/** GA4 default stream (override with `NEXT_PUBLIC_GA_MEASUREMENT_ID`). */
const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() || "G-4KH0ZSXVCP";

/** Set in `.env.local` after you get your Grow site ID from Mediavine (app.mediavine.com/grow). */
const mediavineGrowSiteId = process.env.NEXT_PUBLIC_MEDIAVINE_GROW_SITE_ID;

/** impact.com Publisher Tag (tracking script). Paste full `<script>…</script>` or inner JS into `IMPACT_PUBLISHER_TAG`. */
const impactPublisherTagInnerHtml = getImpactPublisherTagInnerHtml();

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const verification: NonNullable<Metadata["verification"]> = {};
  const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
  const bingVerification = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION;
  if (googleVerification) verification.google = googleVerification;
  if (bingVerification) verification.other = { "msvalidate.01": bingVerification };
  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: "Georgetown Home Services",
      template: "%s | Georgetown Home Services",
    },
    description:
      "Independent Georgetown TX home services directory—compare plumbers, HVAC, roofers, and more with real reviews and local cost guides.",
    robots: { index: true, follow: true },
    other: {
      /** impact.com crawlers expect <meta name="impact-site-verification" content="..."> (HTML uses `content`, not `value`). */
      "impact-site-verification": impactSiteVerification,
    },
    ...(googleVerification || bingVerification ? { verification } : {}),
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationJsonLd = organizationSchema();
  const websiteJsonLd = websiteSchema();

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full text-ink antialiased`}
    >
      <head>
        {impactPublisherTagInnerHtml ? (
          <script
            type="text/javascript"
            id="impact-publisher-tag"
            dangerouslySetInnerHTML={{ __html: impactPublisherTagInnerHtml }}
          />
        ) : null}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        {mediavineGrowSiteId ? (
          <Script
            id="mediavine-grow"
            src={`https://uploads.mediavine.com/grow/${mediavineGrowSiteId}.js`}
            strategy="lazyOnload"
          />
        ) : null}
        <HomeFaqPageHeadJsonLd />
        <JsonLd data={organizationJsonLd} />
        <JsonLd data={websiteJsonLd} />
      </head>
      <body className="min-h-full flex flex-col bg-surface text-ink leading-[1.65]">
        <HomeHailAlertBanner />
        <StickyHeader />
        <main className="flex-1 pt-20">{children}</main>
        <EmailCaptureSitewide />
        <SiteFooter />
      </body>
      {/* GA4 (gtag.js) via @next/third-parties/google — same as manual <GoogleAnalytics /> / gtag snippet. */}
      <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />
    </html>
  );
}
