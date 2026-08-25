#!/usr/bin/env node
/**
 * Lightweight smoke checks against a running server (default http://127.0.0.1:3000).
 * Usage: BASE_URL=http://127.0.0.1:3000 node scripts/smoke-check.mjs
 */
const base = (process.env.BASE_URL || "http://127.0.0.1:3000").replace(/\/$/, "");

const paths = [
  "/",
  "/best",
  "/costs",
  "/seasonal",
  "/for-contractors",
  "/services/plumber-georgetown-tx",
  "/robots.txt",
  "/sitemap.xml",
  "/og/best",
];

async function main() {
  let failed = 0;
  for (const p of paths) {
    const url = `${base}${p}`;
    try {
      const res = await fetch(url, { redirect: "manual" });
      const ok = res.status >= 200 && res.status < 400;
      console.log(`${ok ? "OK" : "FAIL"} ${res.status} ${p}`);
      if (!ok) failed += 1;
    } catch (err) {
      console.log(`FAIL 000 ${p} (${err instanceof Error ? err.message : "error"})`);
      failed += 1;
    }
  }

  const feedback = await fetch(`${base}/api/site-feedback`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      topic: "improvement",
      email: "smoke@example.com",
      message: "Smoke test — safe to ignore",
      website: "",
    }),
  }).catch((err) => ({ ok: false, status: 0, err }));

  if (feedback && "status" in feedback) {
    const ok = feedback.status >= 200 && feedback.status < 300;
    console.log(`${ok ? "OK" : "FAIL"} ${feedback.status} POST /api/site-feedback`);
    if (!ok) failed += 1;
  } else {
    console.log("FAIL 000 POST /api/site-feedback");
    failed += 1;
  }

  if (failed) {
    console.error(`\nSmoke check failed: ${failed} check(s)`);
    process.exit(1);
  }
  console.log("\nSmoke check passed.");
}

main();
