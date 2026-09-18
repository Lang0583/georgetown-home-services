const WINDOW_MS = 60 * 60 * 1000;
const MAX_REQUESTS = 5;

type Bucket = number[];

const buckets: Map<string, Bucket> = new Map();

/**
 * Best-effort IP rate limit (module memory). Resets per server instance; use
 * edge/KV rate limiting if you need strict global limits on serverless.
 */
export function contactFormRateLimitOk(ip: string): boolean {
  return allowRequest(ip || "unknown", WINDOW_MS, MAX_REQUESTS);
}

const CHECKOUT_WINDOW_MS = 15 * 60 * 1000;
const CHECKOUT_MAX_REQUESTS = 20;

/** Checkout retries after cancel should not trip the contact-form hourly cap. */
export function waterSpecCheckoutRateLimitOk(ip: string): boolean {
  return allowRequest(`water-spec:${ip || "unknown"}`, CHECKOUT_WINDOW_MS, CHECKOUT_MAX_REQUESTS);
}

function allowRequest(key: string, windowMs: number, maxRequests: number): boolean {
  const now = Date.now();
  let stamps = buckets.get(key) ?? [];
  stamps = stamps.filter((t) => now - t < windowMs);
  if (stamps.length >= maxRequests) {
    buckets.set(key, stamps);
    return false;
  }
  stamps.push(now);
  buckets.set(key, stamps);
  return true;
}
