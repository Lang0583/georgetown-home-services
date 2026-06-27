/**
 * Vercel sometimes resolves the Next.js output under `<repo>/.next` while the
 * builder looks for `.next` under `./georgetown-home-services/` (project/repo name).
 * Mirror the build output only on Vercel so `routes-manifest.json` is found.
 *
 * Next.js releases `.next/lock` on process exit after `next build`, but Vercel's
 * post-build validation still lstats `<root>/.next/lock` — recreate it here.
 */
const fs = require("fs");
const path = require("path");

if (process.env.VERCEL !== "1") {
  process.exit(0);
}

const nextDir = path.join(process.cwd(), ".next");
const targetParent = path.join(process.cwd(), "georgetown-home-services");
const targetNext = path.join(targetParent, ".next");

function ensureNextLock(distDir) {
  if (!fs.existsSync(distDir)) return;
  fs.writeFileSync(path.join(distDir, "lock"), "");
}

if (!fs.existsSync(nextDir)) {
  console.error("vercel-mirror-next: .next is missing after build");
  process.exit(1);
}

fs.mkdirSync(targetParent, { recursive: true });
fs.cpSync(nextDir, targetNext, { recursive: true });

ensureNextLock(nextDir);
ensureNextLock(targetNext);
