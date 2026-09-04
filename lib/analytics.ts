/**
 * GA4 via `window.gtag` (injected by `@next/third-parties/google` → `GoogleAnalytics` in `app/layout.tsx`
 * when `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set).
 *
 * Use {@link trackEvent} or the typed helpers below. Prefer marking key events as conversions in GA4 Admin
 * after they appear in the Events report.
 */

export type TrackEventParams = Record<string, string | number | boolean>;

function pageLocation(): string {
  return typeof window !== "undefined" ? window.location.href : "";
}

/** Send a GA4 event. Values are coerced to strings for maximum gtag compatibility. */
export function trackEvent(eventName: string, params?: TrackEventParams): void {
  if (typeof window === "undefined") return;
  const gtag = window.gtag;
  if (typeof gtag !== "function") return;

  if (!params || !Object.keys(params).length) {
    gtag("event", eventName);
    return;
  }

  const payload: Record<string, string | number | boolean> = {};
  for (const [k, v] of Object.entries(params)) {
    if (v === undefined || v === null || v === "") continue;
    payload[k] = v;
  }
  gtag("event", eventName, payload);
}

/** CJ / partner outbound link — GA4 `affiliate_click` with `category` and `page_path`. */
export function trackAffiliateLinkClick(category: string): void {
  const page_path = typeof window !== "undefined" ? window.location.pathname : "";
  trackEvent("affiliate_click", { category, page_path });
}

/** @deprecated Prefer {@link trackAffiliateLinkClick} with a service category key. */
export function trackAffiliateCtaClick(
  affiliateName: string,
  extra?: { providerName?: string; serviceCategory?: string },
): void {
  const category = extra?.serviceCategory ?? affiliateName.toLowerCase().replace(/\s+/g, "_");
  trackAffiliateLinkClick(category);
}

/** Successful newsletter capture (`/api/newsletter` or service-request seasonal opt-in). */
export function trackNewsletterSubmit(
  source: string,
  extra?: { leadMagnet?: string },
): void {
  const p: TrackEventParams = {
    event_category: "newsletter",
    event_label: source,
    page_location: pageLocation(),
  };
  if (extra?.leadMagnet) p.lead_magnet = extra.leadMagnet;
  trackEvent("newsletter_submit", p);
}

/**
 * `tel:` tap from provider cards / profiles.
 * Same shape as {@link trackAffiliateLinkClick}: named params + `page_path`.
 */
export function trackPhoneClick(providerName: string, category?: string): void {
  const page_path = typeof window !== "undefined" ? window.location.pathname : "";
  const payload: TrackEventParams = {
    provider_name: providerName,
    page_path,
  };
  if (category?.trim()) payload.category = category.trim();
  trackEvent("phone_click", payload);
}

/** Provider “Visit Website” / outbound site opens (before new tab navigation). */
export function trackOutboundClick(
  providerName: string,
  serviceCategory: string,
  destinationUrl: string,
): void {
  trackEvent("outbound_click", {
    event_category: "provider_exit",
    event_label: providerName,
    service_category: serviceCategory,
    destination_url: destinationUrl,
    page_location: pageLocation(),
  });
}

export function trackMapsClick(providerName: string): void {
  trackEvent("maps_click", {
    event_category: "maps_click",
    event_label: providerName,
    page_location: pageLocation(),
  });
}

/** Angi interstitial displayed (session-gated). */
export function trackAffiliateShown(providerName: string, serviceCategory: string): void {
  trackEvent("affiliate_shown", {
    event_category: "affiliate",
    event_label: "Angi",
    provider_name: providerName,
    service_category: serviceCategory,
    page_location: pageLocation(),
  });
}

/** Storm inspection contact form (`/api/contact`). */
export function trackContactFormSubmit(source: string): void {
  trackEvent("contact_form_submit", {
    event_category: "lead",
    event_label: source,
    page_location: pageLocation(),
  });
}

/** AI answer-engine referral (ChatGPT, Perplexity, Claude, Copilot, Gemini). */
export function trackAiReferral(source: string, referrerHost: string): void {
  trackEvent("ai_referral", {
    event_category: "ai_seo",
    ai_source: source,
    referrer_host: referrerHost,
    page_path: typeof window !== "undefined" ? window.location.pathname : "",
    page_location: pageLocation(),
  });
}
