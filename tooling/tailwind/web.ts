import type { Config } from "tailwindcss";
import forms from "@tailwindcss/forms";
import scrollbar from "tailwind-scrollbar";

/* ============================================================
   byescaleira — the press, expressed as Tailwind.

   This app was built on two neutral grey ladders (light-* / dark-*).
   Rather than rewrite ~400 call sites by hand, the ladders are
   REPOINTED at the two stocks: light-* is bone paper, dark-* is
   black paper. Every existing `text-light-900 dark:text-dark-900`
   therefore resolves to byescaleira ink with no edit at the call
   site — and the pairs that were failing WCAG AA stop failing,
   because the ladder no longer contains an unreadable step.

   The old ladders split cleanly by role, and that split is kept:
     50–400   grounds  (paper)
     500–600  rules    (dividers)
     700–1000 ink      (text)
   The jump at 600 to 700 is the ground/ink boundary. It is real, it
   is where the old app already drew it, and it is why steps 700, 800
   and 900 all land on --ink-3: on bone paper there is no readable
   step lighter than --ink-3, so a three-rung ladder of muted greys
   was always a fiction. Three inks is the whole system.
   ============================================================ */

const bone = {
  "light-50": "#fdfcf9",
  "light-100": "#fbf8f1", // --card
  "light-200": "#f3efe5", // --background, the paper
  "light-300": "#ece7d9",
  "light-400": "#e6e0d2", // --surface
  "light-500": "#ded7c6",
  "light-600": "#cdc4af",
  "light-700": "#5f5a50", // --ink-3
  "light-800": "#5f5a50", // --ink-3
  "light-900": "#5f5a50", // --ink-3  (was 3.33:1, the app's main secondary)
  "light-950": "#4e4a41", // --ink-2
  "light-1000": "#26241f", // --foreground
};

const black = {
  "dark-50": "#0b0a09", // --background
  "dark-100": "#17150f", // --surface
  "dark-200": "#1e1b14",
  "dark-300": "#252019", // --card
  "dark-400": "#2d271e",
  "dark-500": "#363024",
  "dark-600": "#423b2d",
  "dark-700": "#918a7c", // --ink-3
  "dark-800": "#918a7c", // --ink-3
  "dark-900": "#ada595", // --ink-2  (was 4.20:1, the app's main secondary)
  "dark-950": "#cec7b7",
  "dark-1000": "#eae4d6", // --foreground
};

export default {
  content: ["./src/**/*.tsx"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },

      /* The ramp carries size, weight and tracking, never colour.
         Sizes are in rem so the app's own small/medium/large font
         preference keeps scaling them. Tuned against the system
         ramp: caption 13, small 15, body 17, card/lead 21. */
      fontSize: {
        xs: ["0.8125rem", { lineHeight: "1.4" }], // caption
        sm: ["0.9375rem", { lineHeight: "1.45" }], // small
        base: ["1.0625rem", { lineHeight: "1.47" }], // body
        lg: ["1.3125rem", { lineHeight: "1.2", letterSpacing: "-0.02em" }], // card
        xl: ["1.5rem", { lineHeight: "1.15", letterSpacing: "-0.028em" }],
        "2xl": ["1.75rem", { lineHeight: "1.13", letterSpacing: "-0.028em" }],
        "3xl": ["2.125rem", { lineHeight: "1.12", letterSpacing: "-0.028em" }],
        "4xl": ["2.5rem", { lineHeight: "1.08", letterSpacing: "-0.03em" }],
        "5xl": ["3.25rem", { lineHeight: "1.05", letterSpacing: "-0.035em" }],
        "6xl": ["4rem", { lineHeight: "1.03", letterSpacing: "-0.035em" }],
      },

      /* Curves belong here: the subject is space, and space is
         capsules and domes. What reads as a generic app is not the
         radius, it is radius PLUS glass PLUS shadow PLUS a hover
         lift. With a 2px ink border and no shadow the same curve
         reads as a printed label. */
      borderRadius: {
        none: "0",
        sm: "8px", // icon tiles
        DEFAULT: "12px",
        md: "12px", // inner surfaces, insets
        lg: "18px", // plates, the default
        xl: "22px", // large panels
        "2xl": "28px",
        "3xl": "34px",
        full: "980px", // every control
      },

      /* A hairline is a rule on a page. */
      borderWidth: { DEFAULT: "2px", 0: "0", 1: "1px", 2: "2px", 4: "4px" },

      /* A ring is a rule drawn as a shadow — it takes no space, which
         is why inputs use it. Same ink, same weight as a border. */
      ringWidth: { DEFAULT: "2px", 0: "0", 1: "2px", 2: "2px", 4: "4px" },
      ringColor: { DEFAULT: "var(--hairline)" },
      ringOffsetColor: { DEFAULT: "var(--background)" },

      /* Weights 400, 500, 600 — nothing heavier; 600 is the ceiling
         for headlines. Capping the SCALE rather than chasing the 97
         font-bold call sites is the only fix that actually holds: a
         utility in @layer utilities outranks any base-layer override,
         so `font-bold` has to BE 600, not be corrected afterwards. */
      fontWeight: {
        thin: "400",
        extralight: "400",
        light: "400",
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "600",
        extrabold: "600",
        black: "600",
      },

      colors: {
        ...bone,
        ...black,

        /* Semantic tokens for new work. Anything written from here
           on should reach for these, not for a numbered rung. */
        background: "var(--background)",
        surface: "var(--surface)",
        panel: "var(--card)",
        foreground: "var(--foreground)",
        "ink-2": "var(--ink-2)",
        "ink-3": "var(--ink-3)",
        hairline: "var(--hairline)",
        accent: "var(--accent-solid)",
        "accent-ink": "var(--accent-ink)",
        "accent-soft": "var(--accent-soft)",
        "on-accent": "var(--on-accent)",
        danger: "var(--danger)",
        "danger-ink": "var(--danger-ink)",
        "danger-soft": "var(--danger-soft)",
        "on-danger": "var(--on-danger)",
      },

      /* Print has no depth of field. Nothing floats, nothing blurs.
         The one exception is --card-shadow, which exists only because
         the light build cannot separate plates by fill alone; it
         resolves to none on black paper. */
      boxShadow: {
        none: "none",
        sm: "none",
        DEFAULT: "none",
        md: "none",
        lg: "none",
        xl: "none",
        "2xl": "none",
        plate: "var(--card-shadow)",
        "3xl-dark": "none",
        "3xl-light": "var(--card-shadow)",
      },

      transitionTimingFunction: {
        DEFAULT: "cubic-bezier(0.32, 0.72, 0, 1)",
        press: "cubic-bezier(0.32, 0.72, 0, 1)", // reveals, hovers
        colour: "cubic-bezier(0.25, 0.1, 0.25, 1)", // colour and opacity ONLY
      },

      /* ORBITAL is continuous and ambient: 15 to 90s, linear, no
         cycle under 5s. The old 4s border-spin broke that floor and
         is retimed rather than kept. */
      animation: {
        "border-spin": "border-spin 46s linear infinite",
        "fade-down": "bye-rise 0.7s cubic-bezier(0.32,0.72,0,1) both",
        "fade-in": "bye-fade 0.7s cubic-bezier(0.25,0.1,0.25,1) both",
        scroll: "scroll 90s linear infinite",
        squeegee: "bye-squeegee 0.9s cubic-bezier(0.32,0.72,0,1) both",
      },
      keyframes: {
        "border-spin": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "bye-rise": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "none" },
        },
        "bye-fade": { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        "bye-squeegee": {
          from: { clipPath: "inset(0 100% 0 0)" },
          to: { clipPath: "inset(0 0 0 0)" },
        },
        scroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(calc(-50% - 1.5rem))" },
        },
      },

      screens: { "2xl": "1600px" },
    },
  },
  plugins: [forms, scrollbar],
} satisfies Config;
