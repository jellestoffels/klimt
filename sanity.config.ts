import type { Config } from "tailwindcss";

const config: Config = {
  // This line is crucial - it tells Tailwind to look inside 'src'
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {

        ink: "#000000",
        paper: "#FFFFFF",
        grey: "#9C9C9C",
        // Derived UI colors
        borderSubtle: "rgba(0,0,0,0.12)",
        borderStrong: "rgba(0,0,0,0.24)",
        overlayInk: "rgba(0,0,0,0.92)",
        overlayGrey: "rgba(156,156,156,0.92)", 
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "Helvetica", "Arial", "sans-serif"],
      },
      spacing: {

        s0: "0px",
        s1: "4px",
        s2: "8px",
        s3: "12px",
        s4: "16px",
        s5: "24px",
        s6: "32px",
        s7: "48px",
        s8: "64px",
        s9: "96px",
        s10: "128px",
        headerMobile: "56px",
        headerDesktop: "64px",
      },
      fontSize: {
        root: "16px",
        bodyLarge: ["18px", "1.45"],
        smallMeta: ["13px", "1.45"],
        nav: ["14px", "1.2"],
      },
      borderRadius: {
        small: "8px",
        medium: "14px",
        large: "22px",
      },
      maxWidth: {
        container: "1200px",
      }
    },
  },
  plugins: [],
};
export default config;