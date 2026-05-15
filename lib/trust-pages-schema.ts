import { SITE_URL } from "./page-seo";

/** Single ISO date for `dateModified` on static trust/legal/editorial pages. Bump when copy changes. */
export const TRUST_PAGES_LAST_MODIFIED_ISO = "2026-05-15";

function pageUrl(pathname: string): string {
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return new URL(path, SITE_URL).href;
}

export function aboutPageJsonLd(opts: { name: string; description: string }) {
  const url = pageUrl("/about");
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": url,
    url,
    name: opts.name,
    description: opts.description,
    dateModified: TRUST_PAGES_LAST_MODIFIED_ISO,
  };
}

export function contactPageJsonLd(opts: { name: string; description: string }) {
  const url = pageUrl("/contact");
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": url,
    url,
    name: opts.name,
    description: opts.description,
    dateModified: TRUST_PAGES_LAST_MODIFIED_ISO,
  };
}

export function webPageTrustJsonLd(opts: { pathname: string; name: string; description: string }) {
  const path = opts.pathname.startsWith("/") ? opts.pathname : `/${opts.pathname}`;
  const url = pageUrl(path);
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": url,
    url,
    name: opts.name,
    description: opts.description,
    dateModified: TRUST_PAGES_LAST_MODIFIED_ISO,
  };
}
