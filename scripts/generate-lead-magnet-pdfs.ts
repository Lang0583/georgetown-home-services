/**
 * Generates lead-magnet and per-season PDFs into private/lead-magnets/ (email-gated).
 * Run: npm run generate:lead-pdfs
 */
import fs from "node:fs";
import path from "node:path";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { getAllSeasonalGuides, seasonalGuidePdfSections } from "../data/seasonal-guides";
import { LEAD_MAGNET_PDF_DIR } from "../lib/pdf-lead-assets";

const outDir = path.join(process.cwd(), LEAD_MAGNET_PDF_DIR);

type PdfSection = { heading: string; bullets: string[] };

function wrapLine(text: string, maxChars: number): string[] {
  if (text.length <= maxChars) return [text];
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let cur = "";
  for (const w of words) {
    const next = cur ? `${cur} ${w}` : w;
    if (next.length <= maxChars) cur = next;
    else {
      if (cur) lines.push(cur);
      cur = w.length > maxChars ? w.slice(0, maxChars) : w;
    }
  }
  if (cur) lines.push(cur);
  return lines;
}

async function writePdf(filename: string, title: string, sections: PdfSection[]) {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const width = 612;
  const height = 792;
  const margin = 50;
  let page = pdfDoc.addPage([width, height]);
  let y = height - margin;

  page.drawText(title, {
    x: margin,
    y,
    size: 16,
    font: fontBold,
    color: rgb(0.05, 0.15, 0.18),
  });
  y -= 28;
  page.drawText("Georgetown Home Services · georgetownhomeservices.com", {
    x: margin,
    y,
    size: 9,
    font,
    color: rgb(0.35, 0.38, 0.42),
  });
  y -= 22;

  for (const { heading, bullets } of sections) {
    if (y < 100) {
      page = pdfDoc.addPage([width, height]);
      y = height - margin;
    }
    page.drawText(heading, {
      x: margin,
      y,
      size: 12,
      font: fontBold,
      color: rgb(0.1, 0.12, 0.14),
    });
    y -= 16;
    for (const line of bullets) {
      const wrapped = wrapLine(line, 82);
      for (const w of wrapped) {
        if (y < 72) {
          page = pdfDoc.addPage([width, height]);
          y = height - margin;
        }
        page.drawText(`• ${w}`, {
          x: margin + 8,
          y,
          size: 10,
          font,
          color: rgb(0.2, 0.22, 0.25),
        });
        y -= 13;
      }
    }
    y -= 8;
  }

  if (y < 100) {
    page = pdfDoc.addPage([width, height]);
    y = height - margin;
  }
  page.drawText(
    "This checklist is for planning only—not a substitute for licensed inspections or professional service.",
    {
      x: margin,
      y,
      size: 8,
      font,
      color: rgb(0.45, 0.45, 0.48),
      maxWidth: width - margin * 2,
    },
  );

  const bytes = await pdfDoc.save();
  const outPath = path.join(outDir, filename);
  fs.writeFileSync(outPath, bytes);
  console.log("Wrote:", outPath);
}

const monthlySections: PdfSection[] = [
  {
    heading: "Every month (about 30 minutes)",
    bullets: [
      "HVAC: Check filter; replace or clean if dirty. Note any new noise or odors when the system runs.",
      "Plumbing: Run water in rarely used sinks/tubs to keep traps full; look under sinks for moisture or stains.",
      "Safety: Test GFCI outlets in kitchens, baths, garage, and exterior; reset if needed.",
      "Exterior: Walk the property—grading toward foundation, sprinkler spray on siding, pest entry gaps.",
    ],
  },
  {
    heading: "Quarterly add-ons",
    bullets: [
      "Vacuum refrigerator coils if accessible; confirm door seals close firmly.",
      "Check water heater area for corrosion, moisture, or error codes on the unit.",
      "Review fire extinguisher pressure gauge and expiration date.",
    ],
  },
  {
    heading: "When something seems off",
    bullets: [
      "Write down dates, symptoms, and photos—helps when you compare quotes.",
      "Use written scopes from multiple providers before large repairs or replacements.",
      "Confirm licensing and insurance directly with the company for your trade and project.",
    ],
  },
];

async function main() {
  fs.mkdirSync(outDir, { recursive: true });

  const guides = getAllSeasonalGuides();

  for (const guide of guides) {
    const sections = seasonalGuidePdfSections(guide);
    await writePdf(
      guide.pdfFilename,
      `Georgetown ${guide.label} Home Checklist (${guide.monthsLabel})`,
      sections,
    );
  }

  const fullYearSections: PdfSection[] = guides.flatMap((guide) => seasonalGuidePdfSections(guide));
  await writePdf(
    "georgetown-seasonal-home-maintenance-checklist.pdf",
    "Georgetown Homeowner Seasonal Maintenance Checklist",
    fullYearSections,
  );

  await writePdf(
    "georgetown-monthly-home-maintenance-reminder.pdf",
    "Monthly Georgetown Home Maintenance Reminder",
    monthlySections,
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
