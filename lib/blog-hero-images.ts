/** Hero images for blog posts (Unsplash, below H1). */

const DEFAULT_SRC =
  "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80";

export type BlogHeroImage = { src: string; alt: string };

const HERO_BY_SLUG: Record<string, BlogHeroImage> = {
  "water-heater-not-working-georgetown-tx": {
    src: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=1200&q=80",
    alt: "Water heater repair in Georgetown TX home",
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
  "how-to-find-a-good-plumber-georgetown-tx": {
    src: DEFAULT_SRC,
    alt: "Finding a reliable plumber in Georgetown TX",
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
