/**
 * Remove post-build artifacts from `next-sitemap` that conflict with the
 * dynamic `app/sitemap.ts` pipeline. Keeps committed `public/robots.txt` as a static fallback.
 */
const fs = require("node:fs");
const path = require("node:path");

const publicDir = path.join(__dirname, "..", "public");
for (const name of ["sitemap.xml", "sitemap-0.xml"]) {
  const filePath = path.join(publicDir, name);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    console.log("[clean-legacy-sitemap] removed", filePath);
  }
}
