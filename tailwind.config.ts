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
          DEFAULT: "#075985",
          hover: "#054061",
          light: "#f0f9ff",
        },
      },
    },
  },
} satisfies Config;
