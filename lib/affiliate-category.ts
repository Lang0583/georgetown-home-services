import type { ProviderCategory } from "@/data/providers";

/** Maps legacy Angi list slugs to {@link AFFILIATE_LINKS} keys. */
export function affiliateCategoryFromAngiSlug(angiCategorySlug: string): string {
  const key = angiCategorySlug.trim().toLowerCase();
  const map: Record<string, string> = {
    plumbing: "plumbing",
    hvac: "hvac",
    roofing: "roofing",
    electrical: "electrical",
    landscaping: "landscaping",
    "pest-control": "pestControl",
    "foundation-repair": "foundationRepair",
    "house-cleaning": "houseCleaning",
    home: "default",
  };
  return map[key] ?? "default";
}

export function affiliateCategoryFromProviderCategory(category: ProviderCategory): string {
  const map: Record<ProviderCategory, string> = {
    plumbing: "plumbing",
    hvac: "hvac",
    roofing: "roofing",
    electrical: "electrical",
    landscaping: "landscaping",
    "pest-control": "pestControl",
    foundation: "foundationRepair",
    cleaning: "houseCleaning",
  };
  return map[category];
}

/** Infer CJ category from a Georgetown service or sub-service slug. */
export function affiliateCategoryFromServiceSlug(serviceSlug: string, subServiceSlug?: string): string {
  const combined = `${subServiceSlug ?? ""} ${serviceSlug}`.toLowerCase();
  if (combined.includes("furnace") || /\bheating\b/.test(combined)) return "heating";
  if (combined.includes("plumb")) return "plumbing";
  if (combined.includes("hvac") || combined.includes("air-conditioning") || combined.includes("-ac-")) {
    return "hvac";
  }
  if (combined.includes("roof")) return "roofing";
  if (combined.includes("electric")) return "electrical";
  if (combined.includes("landscap") || combined.includes("lawn") || combined.includes("mowing")) {
    return "landscaping";
  }
  if (combined.includes("pest")) return "pestControl";
  if (combined.includes("foundation")) return "foundationRepair";
  if (combined.includes("clean")) return "houseCleaning";
  return "default";
}
