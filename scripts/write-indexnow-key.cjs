/**
 * Writes `public/<INDEXNOW_KEY>.txt` with the key on one line (IndexNow verification).
 * Run from `prebuild`. Exits 0 when INDEXNOW_KEY is unset (local dev / CI without key).
 */
/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("node:fs");
const path = require("node:path");

const key = process.env.INDEXNOW_KEY?.trim();
if (!key) {
  console.warn("[indexnow] INDEXNOW_KEY unset — skipping verification file (set on Vercel for production).");
  process.exit(0);
}

const publicDir = path.join(process.cwd(), "public");
const out = path.join(publicDir, `${key}.txt`);

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

fs.writeFileSync(out, `${key}\n`, "utf8");
console.log("[indexnow] wrote", path.relative(process.cwd(), out));
