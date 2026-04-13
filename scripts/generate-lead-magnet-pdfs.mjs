/**
 * Generates lead-magnet PDFs into public/downloads/.
 * Run: npm run generate:lead-pdfs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outDir = path.join(root, "public", "downloads");

function wrapLine(text, maxChars) {
  if (text.length <= maxChars) return [text];
  const words = text.split(/\s+/);
  const lines = [];
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

async function main() {
  fs.mkdirSync(outDir, { recursive: true });

  const seasonalSections = [
    {
      heading: "Spring (Mar–May)",
      bullets: [
        "Test AC before the first 90°+ week: run a cooling cycle and note odd sounds, weak airflow, or warm supply air.",
        "Clear debris from outdoor HVAC unit; keep 2–3 feet of clearance on sides and top.",
        "Walk the roofline from the ground after storms: lifted shingles, damaged flashing, gutter overflow.",
        "Exercise main water shutoff valve gently; confirm everyone in the home knows where it is.",
        "Check irrigation heads and drip lines for leaks after freeze risk has passed.",
      ],
    },
    {
      heading: "Summer (Jun–Aug)",
      bullets: [
        "Replace or wash HVAC filter on schedule (often monthly in heavy cooling season).",
        "Monitor indoor humidity; sticky air can signal drainage or coil issues.",
        "Watch for slab moisture or musty odors after heavy rain—note changes for a plumber or foundation pro.",
        "Trim vegetation away from siding and roof; keep gutters flowing during summer downpours.",
      ],
    },
    {
      heading: "Fall (Sep–Nov)",
      bullets: [
        "Schedule heating check before first sustained cool spell if you use gas heat or heat pump heating.",
        "Clean gutters and downspouts after leaves drop; verify downspouts discharge away from the foundation.",
        "Inspect attic for daylight, stained decking, or damp insulation after rain.",
        "Drain and winterize hose bibs if exposed to hard freezes; insulate outdoor pipes where needed.",
      ],
    },
    {
      heading: "Winter (Dec–Feb)",
      bullets: [
        "On freeze nights, drip faucets and open cabinet doors on exterior walls if pipes are vulnerable.",
        "Reverse ceiling fans where appropriate to keep warm air circulating.",
        "After ice or wind events, scan the roof and fence from the ground for new damage.",
        "Test smoke/CO detectors; replace batteries or units per manufacturer guidance.",
      ],
    },
  ];

  const monthlySections = [
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

  async function writePdf(filename, title, sections) {
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
    fs.writeFileSync(path.join(outDir, filename), bytes);
    console.log("Wrote:", path.join(outDir, filename));
  }

  await writePdf("georgetown-seasonal-home-maintenance-checklist.pdf", "Georgetown Homeowner Seasonal Maintenance Checklist", seasonalSections);
  await writePdf("georgetown-monthly-home-maintenance-reminder.pdf", "Monthly Georgetown Home Maintenance Reminder", monthlySections);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
