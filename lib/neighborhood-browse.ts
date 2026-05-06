/**
 * Footer and /services hub: links into neighborhood × service landings.
 * Paths match static routes under `/neighborhoods/[neighborhood]/[service]`.
 */

export type NeighborhoodBrowseEntry = {
  name: string;
  href: string;
  /** Copy for LinkCard on the services hub */
  description: string;
  badge: string;
};

export const NEIGHBORHOOD_BROWSE_ENTRIES: NeighborhoodBrowseEntry[] = [
  {
    name: "Sun City",
    href: "/neighborhoods/sun-city/hvac",
    description:
      "55+ active-adult community: slab homes, hard water, and HVAC reality in peak Georgetown heat.",
    badge: "HVAC",
  },
  {
    name: "Wolf Ranch",
    href: "/neighborhoods/wolf-ranch/hvac",
    description: "Newer 2015+ builds with open plans, long duct runs, and sticky summer humidity indoors.",
    badge: "HVAC",
  },
  {
    name: "Teravista",
    href: "/neighborhoods/teravista/foundation-repair",
    description:
      "Golf-course community with mixed home ages and Central Texas clay—foundation movement and drainage patterns worth monitoring.",
    badge: "Foundation",
  },
  {
    name: "Berry Creek",
    href: "/neighborhoods/berry-creek/plumber",
    description: "Established streets with mature canopy, older laterals, and storm-week drain stress.",
    badge: "Plumbing",
  },
  {
    name: "Georgetown Village",
    href: "/neighborhoods/georgetown-village/plumber",
    description:
      "Central Georgetown mix of eras—square-adjacent loads, hidden cleanouts, and guest-week surges.",
    badge: "Plumbing",
  },
];
