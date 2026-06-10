import type { LeadMagnetKey } from "@/lib/lead-magnets";
import type { TexasSeason } from "@/lib/texas-seasons";

/** Keys for gated PDF assets (not served from `/public`). */
export type PdfLeadKey =
  | "seasonal_full"
  | "monthly"
  | "season_spring"
  | "season_summer"
  | "season_fall"
  | "season_winter";

export type PdfLeadAsset = {
  key: PdfLeadKey;
  filename: string;
  title: string;
  /** Recorded on `/api/newsletter` when this PDF is requested. */
  leadMagnet: LeadMagnetKey;
};

export const PDF_LEAD_ASSETS: Record<PdfLeadKey, PdfLeadAsset> = {
  seasonal_full: {
    key: "seasonal_full",
    filename: "georgetown-seasonal-home-maintenance-checklist.pdf",
    title: "Georgetown Homeowner Seasonal Maintenance Checklist",
    leadMagnet: "seasonal_checklist",
  },
  monthly: {
    key: "monthly",
    filename: "georgetown-monthly-home-maintenance-reminder.pdf",
    title: "Monthly Georgetown Home Maintenance Reminder",
    leadMagnet: "monthly_reminder",
  },
  season_spring: {
    key: "season_spring",
    filename: "georgetown-spring-home-checklist.pdf",
    title: "Georgetown Spring Home Checklist",
    leadMagnet: "seasonal_checklist",
  },
  season_summer: {
    key: "season_summer",
    filename: "georgetown-summer-home-checklist.pdf",
    title: "Georgetown Summer Home Checklist",
    leadMagnet: "seasonal_checklist",
  },
  season_fall: {
    key: "season_fall",
    filename: "georgetown-fall-home-checklist.pdf",
    title: "Georgetown Fall Home Checklist",
    leadMagnet: "seasonal_checklist",
  },
  season_winter: {
    key: "season_winter",
    filename: "georgetown-winter-home-checklist.pdf",
    title: "Georgetown Winter Home Checklist",
    leadMagnet: "seasonal_checklist",
  },
};

const SEASON_TO_PDF_KEY: Record<TexasSeason, PdfLeadKey> = {
  spring: "season_spring",
  summer: "season_summer",
  fall: "season_fall",
  winter: "season_winter",
};

export function isPdfLeadKey(value: string): value is PdfLeadKey {
  return Object.prototype.hasOwnProperty.call(PDF_LEAD_ASSETS, value);
}

export function pdfLeadKeyForSeason(season: TexasSeason): PdfLeadKey {
  return SEASON_TO_PDF_KEY[season];
}

export function pdfLeadAssetForSeason(season: TexasSeason): PdfLeadAsset {
  return PDF_LEAD_ASSETS[pdfLeadKeyForSeason(season)];
}

export function pdfLeadAssetForLeadMagnet(leadMagnet: LeadMagnetKey): PdfLeadAsset | null {
  if (leadMagnet === "seasonal_checklist") return PDF_LEAD_ASSETS.seasonal_full;
  if (leadMagnet === "monthly_reminder") return PDF_LEAD_ASSETS.monthly;
  return null;
}

/** On-disk directory (not web-accessible). */
export const LEAD_MAGNET_PDF_DIR = "private/lead-magnets";
