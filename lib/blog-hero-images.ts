/** Hero images for blog posts (Unsplash, below H1). */

const DEFAULT_SRC =
  "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80";

export type BlogHeroImage = { src: string; alt: string };

const HERO_BY_SLUG: Record<string, BlogHeroImage> = {
  "ac-not-cooling-georgetown-tx": {
    src: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1200&q=80",
    alt: "Air conditioning repair in Georgetown TX home",
  },
  "water-heater-not-working-georgetown-tx": {
    src: "https://images.unsplash.com/photo-1599045118108-bf9954418b76?w=1200&q=80",
    alt: "Water heater repair in Georgetown TX home",
  },
  "slab-leak-signs-georgetown-tx": {
    src: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200&q=80",
    alt: "Plumber inspecting for slab leak signs in Georgetown TX home",
  },
  "foundation-crack-georgetown-tx": {
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80",
    alt: "Foundation inspection in Georgetown TX home",
  },
  "hvac-making-noise-georgetown-tx": {
    src: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1200&q=80",
    alt: "HVAC technician diagnosing noisy unit in Georgetown TX",
  },
  "cost-to-replace-hvac-georgetown": {
    src: DEFAULT_SRC,
    alt: "HVAC replacement cost guide Georgetown TX",
  },
  "emergency-plumber-cost-georgetown-tx": {
    src: DEFAULT_SRC,
    alt: "Emergency plumber service in Georgetown TX",
  },
  "signs-you-need-hvac-repair-georgetown-tx": {
    src: DEFAULT_SRC,
    alt: "HVAC repair signs Georgetown TX home",
  },
  "ac-repair-cost-georgetown-tx": {
    src: DEFAULT_SRC,
    alt: "AC repair cost estimate Georgetown TX",
  },
  "why-your-ac-is-not-cooling-georgetown-tx": {
    src: DEFAULT_SRC,
    alt: "AC not cooling troubleshooting Georgetown TX",
  },
  "roof-replacement-cost-georgetown-tx": {
    src: DEFAULT_SRC,
    alt: "Roof replacement cost estimate Georgetown TX",
  },
  "roof-repair-cost-georgetown-tx": {
    src: DEFAULT_SRC,
    alt: "Roof repair Georgetown TX home",
  },
  "signs-you-may-need-a-new-roof-georgetown-tx": {
    src: DEFAULT_SRC,
    alt: "Roof inspection signs Georgetown TX",
  },
  "after-hail-roof-checklist-georgetown-tx": {
    src: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=1200&q=80",
    alt: "Storm clouds over Texas neighborhood — roof checklist after hail",
  },
  "hail-damage-georgetown-williamson-may-2026": {
    src: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=1200&q=80",
    alt: "Dark storm clouds over Central Texas — hail damage checklist May 2026",
  },
  "hail-damage-sun-city-georgetown-tx": {
    src: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=1200&q=80",
    alt: "Storm clouds over Texas — Sun City hail damage May 2026",
  },
  "hail-damage-teravista-georgetown-tx": {
    src: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=1200&q=80",
    alt: "Storm clouds over Texas — Teravista hail damage May 2026",
  },
  "hail-damage-wolf-ranch-georgetown-tx": {
    src: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=1200&q=80",
    alt: "Storm clouds over Texas — Wolf Ranch hail damage May 2026",
  },
  "hail-damage-georgetown-village-tx": {
    src: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=1200&q=80",
    alt: "Storm clouds over Texas — Georgetown Village hail damage May 2026",
  },
  "how-to-choose-a-reliable-plumber-georgetown-tx": {
    src: DEFAULT_SRC,
    alt: "How to choose a plumber Georgetown TX",
  },
};

export function getBlogHeroImage(slug: string): BlogHeroImage {
  const hero = HERO_BY_SLUG[slug];
  if (hero) return hero;
  return {
    src: DEFAULT_SRC,
    alt: "Home services in Georgetown TX",
  };
}
