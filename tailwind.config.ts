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
          DEFAULT: "#01696F",
          hover: "#0C4E54",
          light: "#E6F2F2",
        },
      },
    },
  },
} satisfies Config;
