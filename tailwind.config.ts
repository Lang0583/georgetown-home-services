import type { Config } from "tailwindcss";

/**
 * Brand palette (mirrors `app/globals.css` @theme). Kept for reference and tooling;
 * Tailwind v4 utilities resolve from CSS theme variables.
 */
export default {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0a5c64",
          hover: "#084249",
          light: "#e6f2f2",
        },
      },
    },
  },
} satisfies Config;
