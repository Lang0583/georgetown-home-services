/**
 * Build-time PDF generation with Puppeteer (devDependency only).
 * Output: public/downloads/hvac-texas-heat-guide.pdf
 *
 * Run: npm run generate:pdfs
 */
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import puppeteer from "puppeteer";
import { HVAC_TEXAS_HEAT_GUIDE_FILENAME } from "../lib/hvac-texas-heat-guide";

const templatePath = path.join(process.cwd(), "private/pdf-templates/hvac-texas-heat-guide.html");
const outDir = path.join(process.cwd(), "public/downloads");
const outPath = path.join(outDir, HVAC_TEXAS_HEAT_GUIDE_FILENAME);

async function main() {
  if (!fs.existsSync(templatePath)) {
    console.error(`[generate-pdfs] Missing template: ${templatePath}`);
    process.exit(1);
  }

  fs.mkdirSync(outDir, { recursive: true });

  const htmlUrl = pathToFileURL(templatePath).href;
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    const page = await browser.newPage();
    await page.goto(htmlUrl, { waitUntil: "networkidle0" });
    await page.pdf({
      path: outPath,
      format: "letter",
      printBackground: true,
      margin: { top: "0.5in", right: "0.5in", bottom: "0.5in", left: "0.5in" },
    });
  } finally {
    await browser.close();
  }

  const sizeKb = Math.round(fs.statSync(outPath).size / 1024);
  console.log(`[generate-pdfs] Wrote ${outPath} (${sizeKb} KB)`);
}

main().catch((err) => {
  console.error("[generate-pdfs] Failed:", err);
  process.exit(1);
});
