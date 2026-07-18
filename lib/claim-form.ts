import {
  PROVIDER_CATEGORY_LABELS,
  PROVIDER_CATEGORY_ORDER,
  type ProviderCategory,
} from "@/data/providers";

export const CLAIM_TIERS = [
  { value: "free", label: "Free organic listing" },
  { value: "claimed", label: "Claimed Profile ($99/mo)" },
  { value: "featured", label: "Featured Placement ($299/mo)" },
] as const;

export type ClaimTierValue = (typeof CLAIM_TIERS)[number]["value"];

export const CLAIM_CATEGORY_OPTIONS = PROVIDER_CATEGORY_ORDER.map((value) => ({
  value,
  label: PROVIDER_CATEGORY_LABELS[value],
}));

export function isClaimTier(value: string): value is ClaimTierValue {
  return CLAIM_TIERS.some((t) => t.value === value);
}

export function isClaimCategory(value: string): value is ProviderCategory {
  return (PROVIDER_CATEGORY_ORDER as readonly string[]).includes(value);
}
