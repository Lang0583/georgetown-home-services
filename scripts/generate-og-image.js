/**
 * One-time / on-demand generator for the default Open Graph image.
 * Run: node scripts/generate-og-image.js
 * Output: public/og-image.jpg (1200×630 JPEG)
 */
const path = require("path");
const sharp = require("sharp");

const WIDTH = 1200;
const HEIGHT = 630;

function buildSvg() {
  const title = "Georgetown Home Services";
  const subtitle = "Local Home Service Directory | Georgetown, TX";
  const domain = "georgetownhomeservices.com";
  const font =
    "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <rect width="100%" height="100%" fill="#01696F"/>
  <text x="${WIDTH / 2}" y="268" text-anchor="middle" fill="#FFFFFF" font-family="${font}" font-size="56" font-weight="700">${escapeXml(
    title
  )}</text>
  <text x="${WIDTH / 2}" y="348" text-anchor="middle" fill="#FFFFFF" font-family="${font}" font-size="26" font-weight="500">${escapeXml(
    subtitle
  )}</text>
  <text x="${WIDTH / 2}" y="582" text-anchor="middle" fill="#FFFFFF" font-family="${font}" font-size="20" font-weight="400" opacity="0.92">${escapeXml(
    domain
  )}</text>
</svg>`;
}

function escapeXml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function main() {
  const outPath = path.join(__dirname, "..", "public", "og-image.jpg");
  const svg = buildSvg();

  await sharp(Buffer.from(svg))
    .resize(WIDTH, HEIGHT, { fit: "fill" })
    .jpeg({ quality: 92, mozjpeg: true })
    .toFile(outPath);

  const meta = await sharp(outPath).metadata();
  console.log("Wrote:", outPath);
  console.log("Dimensions:", meta.width, "×", meta.height, "format:", meta.format);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
