import type { BlogExpansionCategory } from "../data/blog-posts";
import { getBlogExpansionPost } from "../data/blog-posts";

type AffiliateMapping = {
  angiCategorySlug: string;
  thumbtackCategory: string;
  serviceLabel: string;
};

const BY_CATEGORY: Record<BlogExpansionCategory, AffiliateMapping> = {
  plumbing: { angiCategorySlug: "plumbing", thumbtackCategory: "plumbers", serviceLabel: "plumbers" },
  hvac: { angiCategorySlug: "hvac", thumbtackCategory: "hvac-contractors", serviceLabel: "HVAC companies" },
  roofing: { angiCategorySlug: "roofing", thumbtackCategory: "roofers", serviceLabel: "roofers" },
  electrical: {
    angiCategorySlug: "electrical",
    thumbtackCategory: "electricians",
    serviceLabel: "electricians",
  },
  landscaping: {
    angiCategorySlug: "landscaping",
    thumbtackCategory: "landscapers",
    serviceLabel: "landscaping companies",
  },
  "pest-control": {
    angiCategorySlug: "pest-control",
    thumbtackCategory: "pest-control",
    serviceLabel: "pest control companies",
  },
  foundation: {
    angiCategorySlug: "foundation-repair",
    thumbtackCategory: "foundation-repair",
    serviceLabel: "foundation repair specialists",
  },
  cleaning: {
    angiCategorySlug: "house-cleaning",
    thumbtackCategory: "house-cleaning",
    serviceLabel: "house cleaning services",
  },
};

export function blogAffiliateConfigForSlug(slug: string): AffiliateMapping | null {
  const post = getBlogExpansionPost(slug);
  if (!post || post.status !== "live") return null;
  return BY_CATEGORY[post.category];
}
