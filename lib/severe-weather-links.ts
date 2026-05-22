/** Canonical internal URLs for storm / hail discovery (home strip, editorial cross-links). */
export const SEVERE_WEATHER_LINKS = {
  roofingHub: "/services/roofing",
  /** Short redirect — prefer for campaigns; hub canonical is `roofingHub`. */
  roofingShortUrl: "/roofing",
  hailGuideBlog: "/blog/hail-damage-georgetown-williamson-may-2026",
  bestRoofers: "/best/best-roofers-georgetown-tx",
} as const;

/** Neighborhood hail hubs (heavy tree/wind microclimates)—link from home severe-weather strip. */
export const NEIGHBORHOOD_HAIL_HUB_ROUTES = [
  { href: "/neighborhoods/sun-city/hail-damage", label: "Sun City hail hub" },
  { href: "/neighborhoods/teravista/hail-damage", label: "Teravista hail hub" },
  { href: "/neighborhoods/wolf-ranch/hail-damage", label: "Wolf Ranch hail hub" },
  { href: "/neighborhoods/georgetown-village/hail-damage", label: "Georgetown Village hail hub" },
] as const;
