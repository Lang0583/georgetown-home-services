import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { topGscInspectionUrls } from "../lib/sitemap-priority-urls";

const urls = topGscInspectionUrls(30);
const body = [
  "# Top 30 URLs for Google Search Console URL Inspection (highest priority first)",
  "# Generated for Georgetown Home Services — submit each in GSC → URL Inspection → Request indexing",
  "# Regenerate: npx tsx scripts/write-sitemap-priority.ts",
  "",
  ...urls,
  "",
].join("\n");

writeFileSync(join(process.cwd(), "public", "sitemap-priority.txt"), body, "utf8");
console.log(`[write-sitemap-priority] wrote ${urls.length} URLs`);
