/**
 * GA4 helpers — browser only. `GoogleAnalytics` from `@next/third-parties/google` in `app/layout.tsx`
 * loads `window.gtag` when `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set.
 *
 * NOTE: Mark phone_click, affiliate_click, and email_signup as conversions in GA4 admin:
 * https://analytics.google.com → Admin → Events → mark each event as a conversion (after they appear from traffic).
 */

function gtagEvent(eventName: string, params: Record<string, string>): void {
  if (typeof window === "undefined") return;
  const g = window.gtag;
  if (typeof g !== "function") return;
  g("event", eventName, params);
}

/** Provider “Visit Website” / outbound site opens (fires at click intercept, before navigation). */
export function trackOutboundClick(
  providerName: string,
  serviceCategory: string,
  destinationUrl: string,
): void {
  if (typeof window === "undefined") return;
  gtagEvent("outbound_click", {
    event_category: "provider_exit",
    event_label: providerName,
    service_category: serviceCategory,
    destination_url: destinationUrl,
    page_location: window.location.href,
  });
}

export function trackPhoneClick(providerName: string): void {
  gtagEvent("phone_click", {
    event_label: providerName,
  });
}

export function trackMapsClick(providerName: string): void {
  gtagEvent("maps_click", {
    event_label: providerName,
  });
}

export function trackEmailSignup(): void {
  gtagEvent("email_signup", {
    event_label: "newsletter",
  });
}

/** Angi (affiliate) interstitial displayed. */
export function trackAffiliateShown(providerName: string, serviceCategory: string): void {
  gtagEvent("affiliate_shown", {
    event_label: providerName,
    service_category: serviceCategory,
  });
}

/** User clicked the Angi CTA from the interstitial. */
export function trackAffiliateClick(providerName: string, serviceCategory: string): void {
  gtagEvent("affiliate_click", {
    event_label: providerName,
    service_category: serviceCategory,
  });
}
