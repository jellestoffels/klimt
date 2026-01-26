import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      md: "768px", // Tablet
      lg: "1024px", // Desktop
    },
    extend: {
      colors: {
        black: "#000000",
        white: "#FFFFFF",
        grey: "#9C9C9C",
      },
      fontFamily: {
        sans: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica", "Arial", "sans-serif"],
      },
      fontSize: {
        // [Section 2.2] Base sizes
        body: ["14px", "1.35"],
        nav: ["14px", "1.2"],
        label: ["13px", "1.2"],
        // Specific page sizes
        desc: ["16px", "1.35"],
        introDesktop: ["64px", "0.95"],
        introTablet: ["52px", "1.0"],
        introMobile: ["38px", "1.02"],
        contactDesktop: ["72px", "0.92"],
        contactTablet: ["56px", "0.95"],
        contactMobile: ["34px", "1.05"],
      },
      spacing: {
        // [Section 2.3] Global spacing
        headerDesktop: "64px",
        headerMobile: "56px",
        sectionDesktop: "64px",
        sectionMobile: "40px",
        padDesktop: "48px",
        padTablet: "32px",
        padMobile: "20px",
      },
      borderRadius: {
        page: "22px",
      },
    },
  },
  plugins: [],
};
export default config;