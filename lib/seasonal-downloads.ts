import type { TexasSeason } from "@/lib/texas-seasons";
import { getAllSeasonalGuides } from "@/data/seasonal-guides";

/** Public PDF paths under `/downloads/`. */
export const SEASONAL_PDF_PATHS: Record<TexasSeason, string> = {
  spring: "/downloads/georgetown-spring-home-checklist.pdf",
  summer: "/downloads/georgetown-summer-home-checklist.pdf",
  fall: "/downloads/georgetown-fall-home-checklist.pdf",
  winter: "/downloads/georgetown-winter-home-checklist.pdf",
};

export const SEASONAL_PDF_FILENAMES: Record<TexasSeason, string> = {
  spring: "georgetown-spring-home-checklist.pdf",
  summer: "georgetown-summer-home-checklist.pdf",
  fall: "georgetown-fall-home-checklist.pdf",
  winter: "georgetown-winter-home-checklist.pdf",
};

export function seasonalPdfPath(season: TexasSeason): string {
  return SEASONAL_PDF_PATHS[season];
}

/** All per-season PDFs for welcome email attachments. */
export function allSeasonalPdfFilenames(): string[] {
  return getAllSeasonalGuides().map((g) => g.pdfFilename);
}
