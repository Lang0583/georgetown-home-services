/**
 * Product affiliate offers for editorial callouts.
 * Replace placeholder URLs with Impact tracking links when approved.
 */

export type AffiliateOffer = {
  /** Stable key used in cost-guide placement maps. */
  id: string;
  productName: string;
  /** Outbound link label (defaults to product name when omitted). */
  linkLabel?: string;
  /** Partner name sent to GA4 `affiliate_click` as `event_label`. */
  affiliateName: string;
  // TODO: Replace with Impact affiliate tracking URL once approved
  href: string;
};

export type CostGuideAffiliateCallout = {
  offerId: string;
  /** One-sentence Georgetown-local justification shown in the callout. */
  justification: string;
};

/** Product catalog — swap `href` values for Impact tags without touching components. */
export const AFFILIATE_OFFERS: Record<string, AffiliateOffer> = {
  "home-warranty": {
    id: "home-warranty",
    productName: "Home warranty comparison",
    linkLabel: "Compare home warranty plans",
    affiliateName: "Home Warranty",
    href: "https://www.example.com/home-warranty-comparison",
  },
  "smart-thermostat": {
    id: "smart-thermostat",
    productName: "Smart thermostat",
    linkLabel: "Shop smart thermostats",
    affiliateName: "Smart Thermostat",
    href: "https://www.example.com/smart-thermostat",
  },
  "water-filtration": {
    id: "water-filtration",
    productName: "Whole-home water filtration",
    linkLabel: "Compare water filtration systems",
    affiliateName: "Water Filtration",
    href: "https://www.example.com/water-filtration",
  },
  "gutter-guards": {
    id: "gutter-guards",
    productName: "Gutter guards",
    linkLabel: "Compare gutter guard options",
    affiliateName: "Gutter Guards",
    href: "https://www.example.com/gutter-guards",
  },
};

/** Contextual affiliate callouts keyed by `/costs/[slug]`. */
export const COST_GUIDE_AFFILIATE_CALLOUTS: Record<string, CostGuideAffiliateCallout[]> = {
  "hvac-repair-cost-georgetown-tx": [
    {
      offerId: "home-warranty",
      justification:
        "Georgetown summers stress AC systems for months on end—a home warranty can cover major HVAC failures after manufacturer coverage ends.",
    },
  ],
  "hvac-maintenance-cost-georgetown-tx": [
    {
      offerId: "home-warranty",
      justification:
        "Even with annual tune-ups, compressor and coil failures still happen in Central Texas heat—a warranty comparison helps you plan for the big repair bill.",
    },
  ],
  "ac-installation-cost-georgetown-tx": [
    {
      offerId: "smart-thermostat",
      justification:
        "Pairing a new AC with a smart thermostat helps Georgetown homeowners trim peak-summer bills while keeping Sun City and Wolf Ranch homes comfortable in triple-digit heat.",
    },
  ],
  "plumber-cost-georgetown-tx": [
    {
      offerId: "home-warranty",
      justification:
        "Slab leaks and water-heater failures are common in Georgetown's slab-on-grade neighborhoods—a home warranty can offset plumbing repairs your homeowners policy won't cover.",
    },
    {
      offerId: "water-filtration",
      justification:
        "Hard Edwards Aquifer water accelerates scale buildup in Georgetown fixtures and heaters—whole-home filtration can extend appliance life and improve taste.",
    },
  ],
  "drain-cleaning-cost-georgetown-tx": [
    {
      offerId: "home-warranty",
      justification:
        "Recurring drain backups in older Georgetown subdivisions often signal bigger sewer issues—a home warranty comparison helps you weigh coverage before the next emergency call.",
    },
  ],
  "water-heater-installation-cost-georgetown-tx": [
    {
      offerId: "home-warranty",
      justification:
        "Water heaters fail on tight timelines in Georgetown's hard-water environment—a home warranty can cover replacement and related plumbing when a unit dies outside its factory warranty.",
    },
  ],
  "roof-replacement-cost-georgetown-tx": [
    {
      offerId: "gutter-guards",
      justification:
        "Fresh shingles shed hail and oak debris faster when gutters stay clear—guards cut ladder work and overflow damage common on two-story Teravista and Wolf Ranch homes.",
    },
  ],
  "roof-repair-cost-georgetown-tx": [
    {
      offerId: "gutter-guards",
      justification:
        "Clogged gutters from live-oak leaf drop often push water under Georgetown rooflines—guards reduce overflow that turns a small boot leak into ceiling drywall damage.",
    },
  ],
};

export function affiliateCalloutsForCostGuide(slug: string): CostGuideAffiliateCallout[] {
  return COST_GUIDE_AFFILIATE_CALLOUTS[slug] ?? [];
}

export function affiliateOfferById(id: string): AffiliateOffer | undefined {
  return AFFILIATE_OFFERS[id];
}
