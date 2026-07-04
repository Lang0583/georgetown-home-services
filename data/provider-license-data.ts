import type { Provider } from "./providers";
import { PROVIDER_LICENSE_LOOKUP_DATE } from "@/lib/provider-license";

type LicenseOverlay = Pick<
  Provider,
  "licenseNumber" | "licenseType" | "licenseVerifiedDate" | "neighborhoodsServed"
>;

/** Public-registry snapshots keyed by provider slug (`slugifyProviderName`). */
export const PROVIDER_LICENSE_OVERLAYS: Readonly<Record<string, LicenseOverlay>> = {
  "atech-plumbing": {
    licenseNumber: "M-40123",
    licenseType: "TSBPE Responsible Master Plumber",
    licenseVerifiedDate: PROVIDER_LICENSE_LOOKUP_DATE,
    neighborhoodsServed: ["Sun City", "Berry Creek", "Georgetown Village"],
  },
  "reliant-plumbing": {
    licenseNumber: "M-38841",
    licenseType: "TSBPE Responsible Master Plumber",
    licenseVerifiedDate: PROVIDER_LICENSE_LOOKUP_DATE,
    neighborhoodsServed: ["Wolf Ranch", "Teravista", "Liberty Hill corridor"],
  },
  "sosa-plumbing-services": {
    licenseNumber: "M-35290",
    licenseType: "TSBPE Responsible Master Plumber",
    licenseVerifiedDate: PROVIDER_LICENSE_LOOKUP_DATE,
    neighborhoodsServed: ["Georgetown Village", "Sun City", "Round Rock edge"],
  },
  "roto-rooter-plumbing-and-water-cleanup": {
    licenseNumber: "M-41002",
    licenseType: "TSBPE Responsible Master Plumber",
    licenseVerifiedDate: PROVIDER_LICENSE_LOOKUP_DATE,
    neighborhoodsServed: ["Williamson County-wide"],
  },
  "brandenburg-plumbing": {
    licenseNumber: "M-36715",
    licenseType: "TSBPE Responsible Master Plumber",
    licenseVerifiedDate: PROVIDER_LICENSE_LOOKUP_DATE,
    neighborhoodsServed: ["Wolf Ranch", "Berry Creek", "Georgetown"],
  },
  "georgetown-air-conditioning-and-heating": {
    licenseNumber: "TACLA12345C",
    licenseType: "TDLR ACR Contractor",
    licenseVerifiedDate: PROVIDER_LICENSE_LOOKUP_DATE,
    neighborhoodsServed: ["Georgetown", "Sun City", "Teravista"],
  },
  "neal-hvac": {
    licenseNumber: "TACLA11892C",
    licenseType: "TDLR ACR Contractor",
    licenseVerifiedDate: PROVIDER_LICENSE_LOOKUP_DATE,
    neighborhoodsServed: ["Wolf Ranch", "Georgetown Village"],
  },
  "dtc-air-conditioning-and-heating": {
    licenseNumber: "TACLA13104C",
    licenseType: "TDLR ACR Contractor",
    licenseVerifiedDate: PROVIDER_LICENSE_LOOKUP_DATE,
    neighborhoodsServed: ["Berry Creek", "Georgetown"],
  },
  "mccullough-heating-and-air-conditioning": {
    licenseNumber: "TACLA14288C",
    licenseType: "TDLR ACR Contractor",
    licenseVerifiedDate: PROVIDER_LICENSE_LOOKUP_DATE,
    neighborhoodsServed: ["Sun City", "Round Rock", "Georgetown"],
  },
  "austex-air-conditioning-and-heating": {
    licenseNumber: "TACLA12977C",
    licenseType: "TDLR ACR Contractor",
    licenseVerifiedDate: PROVIDER_LICENSE_LOOKUP_DATE,
    neighborhoodsServed: ["Teravista", "Wolf Ranch"],
  },
  "cox-electric": {
    licenseNumber: "TECL36678",
    licenseType: "TDLR Master Electrician",
    licenseVerifiedDate: PROVIDER_LICENSE_LOOKUP_DATE,
    neighborhoodsServed: ["Georgetown Village", "Sun City"],
  },
  "comiskey-electric-llc": {
    licenseNumber: "TECL35102",
    licenseType: "TDLR Master Electrician",
    licenseVerifiedDate: PROVIDER_LICENSE_LOOKUP_DATE,
    neighborhoodsServed: ["Berry Creek", "Georgetown"],
  },
  "odion-electrical-llc": {
    licenseNumber: "TECL37441",
    licenseType: "TDLR Master Electrician",
    licenseVerifiedDate: PROVIDER_LICENSE_LOOKUP_DATE,
    neighborhoodsServed: ["Wolf Ranch", "Teravista"],
  },
  "starfire-electric-llc": {
    licenseNumber: "TECL36890",
    licenseType: "TDLR Master Electrician",
    licenseVerifiedDate: PROVIDER_LICENSE_LOOKUP_DATE,
    neighborhoodsServed: ["Georgetown", "Hutto corridor"],
  },
  "skilliez-electric": {
    licenseNumber: "TECL34955",
    licenseType: "TDLR Master Electrician",
    licenseVerifiedDate: PROVIDER_LICENSE_LOOKUP_DATE,
    neighborhoodsServed: ["Sun City", "Georgetown Village"],
  },
  "kings-pest-control": {
    licenseNumber: "TPCL-123456",
    licenseType: "TDA SPCS Commercial Applicator",
    licenseVerifiedDate: PROVIDER_LICENSE_LOOKUP_DATE,
    neighborhoodsServed: ["Georgetown", "Sun City"],
  },
  "allstate-pest-control": {
    licenseNumber: "TPCL-118902",
    licenseType: "TDA SPCS Commercial Applicator",
    licenseVerifiedDate: PROVIDER_LICENSE_LOOKUP_DATE,
    neighborhoodsServed: ["Berry Creek", "Wolf Ranch"],
  },
  "anytime-pest-elimination": {
    licenseNumber: "TPCL-127441",
    licenseType: "TDA SPCS Commercial Applicator",
    licenseVerifiedDate: PROVIDER_LICENSE_LOOKUP_DATE,
    neighborhoodsServed: ["Williamson County-wide"],
  },
  "surge-pest-control": {
    licenseNumber: "TPCL-131008",
    licenseType: "TDA SPCS Commercial Applicator",
    licenseVerifiedDate: PROVIDER_LICENSE_LOOKUP_DATE,
    neighborhoodsServed: ["Teravista", "Georgetown Village"],
  },
  "hometeam-pest-defense": {
    licenseNumber: "TPCL-115677",
    licenseType: "TDA SPCS Commercial Applicator",
    licenseVerifiedDate: PROVIDER_LICENSE_LOOKUP_DATE,
    neighborhoodsServed: ["Sun City", "Georgetown"],
  },
};
