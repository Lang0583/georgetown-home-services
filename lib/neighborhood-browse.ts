/**
 * Footer and /services hub: links into neighborhood landings.
 * Primary links target tri-trade `/neighborhoods/[slug]/home-services` hubs.
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
    href: "/neighborhoods/sun-city/home-services",
    description:
      "55+ community: slab plumbing, peak-summer HVAC, and storm-season roofing—one hub for plumber, AC, and roofer context.",
    badge: "Core trades",
  },
  {
    name: "Wolf Ranch",
    href: "/neighborhoods/wolf-ranch/home-services",
    description: "Newer builds: open-plan cooling, manifold plumbing, and builder-era roofs—plan all three trades locally.",
    badge: "Core trades",
  },
  {
    name: "Teravista",
    href: "/neighborhoods/teravista/home-services",
    description:
      "Mixed-era homes near the course: humidity, drains, and wind in valleys—plumber, HVAC, and roofer guidance together.",
    badge: "Core trades",
  },
  {
    name: "Berry Creek",
    href: "/neighborhoods/berry-creek/home-services",
    description: "Mature canopy: shaded coils, older laterals, and tree-heavy roofs—local tri-trade planning page.",
    badge: "Core trades",
  },
  {
    name: "Georgetown Village",
    href: "/neighborhoods/georgetown-village/home-services",
    description:
      "Central Georgetown: event-week loads, tight lots, mixed roof lines—plumber, HVAC, and roofer hub by the Square.",
    badge: "Core trades",
  },
];
