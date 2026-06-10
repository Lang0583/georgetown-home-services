/**
 * Remove post-build artifacts from `next-sitemap` that conflict with the
 * dynamic `/sitemap.xml` → `/api/sitemap-xml` pipeline and `app/robots.ts`.
 */
const fs = require("node:fs");
const path = require("node:path");

const publicDir = path.join(__dirname, "..", "public");
for (const name of ["sitemap.xml", "sitemap-0.xml", "robots.txt"]) {
  const filePath = path.join(publicDir, name);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    console.log("[clean-legacy-sitemap] removed", filePath);
  }
}
