/**
 * Vercel post-build validation expects artifacts that Next.js removes or never writes:
 * - `<distDir>/lock` — Next.js releases the lock when the build subprocess exits.
 * - `<distDir>/routes-manifest-deterministic.json` — platform finalization looks for this
 *   file even though Next.js 16.x only emits `routes-manifest.json` (Git Integration bug).
 *
 * Recreate/copy both on Vercel for the repo-root `.next`.
 */
const fs = require("fs");
const path = require("path");

if (process.env.VERCEL !== "1") {
  process.exit(0);
}

function ensureVercelNextArtifacts(distDir) {
  if (!fs.existsSync(distDir)) return false;

  fs.writeFileSync(path.join(distDir, "lock"), "");

  const routesManifest = path.join(distDir, "routes-manifest.json");
  const routesManifestDeterministic = path.join(distDir, "routes-manifest-deterministic.json");
  if (fs.existsSync(routesManifest) && !fs.existsSync(routesManifestDeterministic)) {
    fs.copyFileSync(routesManifest, routesManifestDeterministic);
  }

  return true;
}

const rootNext = path.join(process.cwd(), ".next");

const ensured = [ensureVercelNextArtifacts(rootNext)].filter(Boolean).length;
if (ensured) {
  console.log(`[vercel] ensured .next lock + routes-manifest-deterministic in ${ensured} location(s)`);
}
