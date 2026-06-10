import type { TexasSeason } from "@/lib/texas-seasons";
import { pdfLeadAssetForSeason, pdfLeadKeyForSeason } from "@/lib/pdf-lead-assets";

export { pdfLeadAssetForSeason, pdfLeadKeyForSeason };

/** @deprecated PDFs are email-gated — use `pdfLeadKeyForSeason` with `PdfEmailDownload`. */
export function seasonalPdfPath(season: TexasSeason): string {
  return pdfLeadKeyForSeason(season);
}
