/**
 * Impact.com HTML-tag verification also allows https://<host>/<key>.txt (same key).
 * Ensures the file exists whenever the site builds (Vercel included).
 */
/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("node:fs");
const path = require("node:path");

/** Same default as `app/layout.tsx` when `IMPACT_SITE_VERIFICATION` is unset. */
const key = process.env.IMPACT_SITE_VERIFICATION?.trim() || "b1d76151-29e8-4a9a-9913-9ea8f5ce9cd9";

const publicDir = path.join(process.cwd(), "public");
const out = path.join(publicDir, `${key}.txt`);

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

fs.writeFileSync(out, `${key}\n`, "utf8");
console.log("[impact] verification file:", path.relative(process.cwd(), out));
