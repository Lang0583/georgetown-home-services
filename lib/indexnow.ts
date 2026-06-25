/**
 * IndexNow client — re-exports the canonical submitter so callers can import
 * from the path described in the project spec (`lib/indexnow`) without
 * duplicating the implementation in `lib/indexnow-submit.ts`.
 *
 * - Reads the IndexNow key from `process.env.INDEXNOW_KEY` (never hard-coded).
 * - POSTs to `https://api.indexnow.org/indexnow`.
 * - Chunks at 10,000 URLs per request (per IndexNow spec).
 * - Logs warnings on missing key or non-OK HTTP responses.
 * - Returns `IndexNowBatchResult[]` so callers can branch on success/failure
 *   (used by `scripts/submit-indexnow.ts` and `app/api/indexnow/route.ts`).
 *
 * Usage:
 *   import { submitUrlsToIndexNow } from "@/lib/indexnow";
 *   await submitUrlsToIndexNow(["https://www.example.com/new-post"]);
 */
export { submitUrlsToIndexNow } from "./indexnow-submit";
export type { IndexNowBatchResult } from "./indexnow-submit";
