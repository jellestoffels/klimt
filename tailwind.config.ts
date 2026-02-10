import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        medium: ["var(--font-medium)"],
        heavy: ["var(--font-heavy)"],
        desc: ["var(--font-desc)"],
      },
      fontSize: {
        base: ["16px", "16px"], // [Req 5]
        desc: ["clamp(18px, 2vw, 24px)", "1.1"], // Visual adjustment for description
        projectTitle: ["40px", "1.1"], // [Req Project Page]
      },
      spacing: {
        navHeight: "34px",
        headerTop: "96px", // [Req Projects] Black header height
        gridGap: "24px",
      },
      maxWidth: {
        custom: "1123px",
      },
      screens: {
        laptop: "1024px", // Targeting the laptop view request
      }
    },
  },
  plugins: [],
};
export default config;