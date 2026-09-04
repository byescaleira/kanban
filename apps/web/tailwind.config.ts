import type { Config } from "tailwindcss";

import baseConfig from "@kan/tailwind-config/web";

/* The press is defined once, in @kan/tailwind-config/web. This app
   adds only its content globs and the typography plugin.

   It used to re-declare fontFamily against --font-geist-sans, which
   was never wired up — the app actually loaded Plus Jakarta Sans. The
   system stack now comes from --font-sans in the base preset, so
   there is nothing to override here. */
export default {
  darkMode: "class",
  content: [...baseConfig.content],
  plugins: [require("@tailwindcss/typography")],
  presets: [baseConfig],
} satisfies Config;
