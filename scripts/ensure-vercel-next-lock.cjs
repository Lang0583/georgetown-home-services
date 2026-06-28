/**
 * Vercel post-build validation lstats `<distDir>/lock` after `next build`, but
 * Next.js releases that lockfile when the build subprocess exits. Recreate it
 * on Vercel for both the repo-root `.next` and the mirrored shim path.
 */
const fs = require("fs");
const path = require("path");

if (process.env.VERCEL !== "1") {
  process.exit(0);
}

function ensureNextLock(distDir) {
  if (!fs.existsSync(distDir)) return false;
  fs.writeFileSync(path.join(distDir, "lock"), "");
  return true;
}

const rootNext = path.join(process.cwd(), ".next");
const shimNext = path.join(process.cwd(), "georgetown-home-services", ".next");

const created = [ensureNextLock(rootNext), ensureNextLock(shimNext)].filter(Boolean).length;
if (created) {
  console.log(`[vercel] ensured .next/lock in ${created} location(s)`);
}
