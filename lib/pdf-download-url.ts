import { createPdfDownloadToken, pdfDownloadApiUrl } from "@/lib/pdf-download-token";
import { type PdfLeadKey } from "@/lib/pdf-lead-assets";

/** Signed URL for immediate browser download after email capture. */
export function createImmediatePdfDownloadUrl(pdfKey: PdfLeadKey, email: string): string {
  const token = createPdfDownloadToken(pdfKey, email, 3_600_000);
  return pdfDownloadApiUrl(token);
}

/** Longer-lived link for transactional email bodies. */
export function createEmailPdfDownloadUrl(pdfKey: PdfLeadKey, email: string): string {
  const token = createPdfDownloadToken(pdfKey, email, 7 * 24 * 3_600_000);
  return pdfDownloadApiUrl(token);
}
