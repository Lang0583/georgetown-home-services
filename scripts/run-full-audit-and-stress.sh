#!/usr/bin/env bash
# Full site audit + HTTP stress in parallel against BASE_URL (default http://127.0.0.1:3210).
# Prerequisite: production server already listening on that port.
set -uo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
mkdir -p .reports
export BASE_URL="${BASE_URL:-http://127.0.0.1:3210}"

ec=0

npm run seo:check > .reports/seo-check.out 2> .reports/seo-check.err &
p1=$!
npx tsx scripts/audit-business-links.ts > .reports/business-links.out 2> .reports/business-links.err &
p2=$!
node scripts/audit-seo.mjs > .reports/crawl-seo.json 2> .reports/crawl-seo.err &
p3=$!
node scripts/audit-links.mjs > .reports/crawl-links.out 2> .reports/crawl-links.err &
p4=$!

npx --yes autocannon@7 -c 100 -d 15 --json "$BASE_URL/" > .reports/stress-home.json 2>> .reports/stress-all.err &
s1=$!
npx --yes autocannon@7 -c 50 -d 10 "$BASE_URL/blog/after-hail-roof-checklist-georgetown-tx" > .reports/stress-blog.txt 2>> .reports/stress-all.err &
s2=$!
npx --yes autocannon@7 -c 50 -d 10 "$BASE_URL/api/sitemap-xml" > .reports/stress-sitemap.txt 2>> .reports/stress-all.err &
s3=$!

for pid in "$p1" "$p2" "$p3" "$p4" "$s1" "$s2" "$s3"; do
  wait "$pid" || ec=1
done

npm audit --audit-level=high 2>&1 | tee .reports/npm-audit.log || true

echo "--- Summary (non-zero stderr files) ---"
for f in .reports/*.err; do
  [[ -s "$f" ]] && echo ">> $f" && head -20 "$f"
done

exit "$ec"
