import type { Config } from "tailwindcss";

/**
 * Semantic design tokens (mirrors `app/globals.css` @theme).
 * Tailwind v4 utilities resolve from CSS theme variables.
 */
export default {
  theme: {
    extend: {
      colors: {
        ink: "#1D2B33",
        surface: "#FFFFFF",
        "surface-alt": "#F3F6F5",
        brand: "#1E3A5F",
        accent: {
          DEFAULT: "#B23A18",
          hover: "#962F14",
        },
        verified: "#1E7A46",
        rating: "#B45309",
        muted: "#5A6B74",
      },
    },
  },
} satisfies Config;
