/**
 * Impact.com HTML-tag verification also allows https://<host>/<key>.txt (same key).
 * Ensures the file exists whenever the site builds (Vercel included).
 */
/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("node:fs");
const path = require("node:path");

/** Same default as `app/layout.tsx` when `IMPACT_SITE_VERIFICATION` is unset. */
const key = process.env.IMPACT_SITE_VERIFICATION?.trim() || "c55a404e-cfbc-482d-b7c6-7f9a33da5279";

const publicDir = path.join(process.cwd(), "public");
const out = path.join(publicDir, `${key}.txt`);

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

fs.writeFileSync(out, `${key}\n`, "utf8");
console.log("[impact] verification file:", path.relative(process.cwd(), out));
