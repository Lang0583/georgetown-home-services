export {};

declare global {
  interface Window {
    /** GA4 gtag — loaded by `GoogleAnalytics` in `app/layout.tsx` when `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set. */
    gtag?: (...args: unknown[]) => void;
  }
}
