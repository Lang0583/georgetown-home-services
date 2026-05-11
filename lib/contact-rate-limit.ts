const WINDOW_MS = 60 * 60 * 1000;
const MAX_REQUESTS = 5;

type Bucket = number[];

const buckets: Map<string, Bucket> = new Map();

/**
 * Best-effort IP rate limit (module memory). Resets per server instance; use
 * edge/KV rate limiting if you need strict global limits on serverless.
 */
export function contactFormRateLimitOk(ip: string): boolean {
  const key = ip || "unknown";
  const now = Date.now();
  let stamps = buckets.get(key) ?? [];
  stamps = stamps.filter((t) => now - t < WINDOW_MS);
  if (stamps.length >= MAX_REQUESTS) {
    buckets.set(key, stamps);
    return false;
  }
  stamps.push(now);
  buckets.set(key, stamps);
  return true;
}
