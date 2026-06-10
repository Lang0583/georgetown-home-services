import { PDF_LEAD_ASSETS } from "@/lib/pdf-lead-assets";

/** Filenames for legacy references and email attachments. */
export const LEAD_MAGNET_PDF_FILENAMES = {
  seasonal: PDF_LEAD_ASSETS.seasonal_full.filename,
  monthly: PDF_LEAD_ASSETS.monthly.filename,
} as const;
