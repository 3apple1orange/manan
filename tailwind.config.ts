import type { Config } from "tailwindcss";

// NOTE: These are placeholder tokens matching the brief's "minimal, cold,
// philosophical" direction. Replace with real values the moment design
// files land — everything below reads from CSS variables in globals.css
// so a re-skin is a one-file change, not a rewrite.
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "rgb(var(--color-ink-rgb) / <alpha-value>)",
        paper: "rgb(var(--color-paper-rgb) / <alpha-value>)",
        muted: "rgb(var(--color-muted-rgb) / <alpha-value>)",
        accent: "rgb(var(--color-ink-rgb) / <alpha-value>)",
        line: "rgb(var(--color-line-rgb) / <alpha-value>)",
    },
      fontFamily: {
        serif: ["var(--font-serif)"],
        sans: ["var(--font-sans)"],
      },
      maxWidth: {
        prose: "68ch",
      },
    },
  },
  plugins: [],
};

export default config;
