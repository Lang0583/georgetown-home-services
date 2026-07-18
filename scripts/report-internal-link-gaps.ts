import { reportInternalLinkGaps } from "../lib/internalLinks";

const gaps = reportInternalLinkGaps();
if (!gaps.length) {
  console.log("[internal-links] No missing cluster targets.");
  process.exit(0);
}

console.log(`[internal-links] ${gaps.length} missing target(s):\n`);
for (const g of gaps) {
  console.log(`- [${g.context}] ${g.target} — ${g.reason}`);
}
process.exit(0);
