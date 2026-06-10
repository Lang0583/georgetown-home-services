import path from "node:path";
import { LEAD_MAGNET_PDF_DIR } from "@/lib/pdf-lead-assets";

/** Absolute path to a gated PDF on disk (server-only). */
export function leadMagnetPdfFilePath(filename: string): string {
  return path.join(process.cwd(), LEAD_MAGNET_PDF_DIR, filename);
}
