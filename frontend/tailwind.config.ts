import { m } from "framer-motion";
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      primary: "#1D57C2",
      secondary: "#4C9FE4",
      text: "#413F3F",
      "dark-text": "#F5F5F5",
      "subtle-text": "#939393",
      "light-shade": "#1D57C21A",
      dark: "#070707",
      gray: "#0B0F12",
      white: "#FFFFFF",
      transparent: "transparent",
      success: "#14CA74",
      danger: "#FF5A65",
    },
    fontFamily: {
      sans: ["var(--font-roboto-flex)"],
      "space-grotesk": ["var(--font-space-grotesk)"],
      "roboto-flex": ["var(--font-roboto-flex)"],
      afacad: ["var(--font-afacad)"],
      abel: ["var(--font-abel)"],
      mulish: ["var(--font-mulish)"],
    },
    extend: {
      screens: {
        xs: "320px",
        sm: "640px",
        md: "768px",
        lg: "1280px",
        xl: "1440px",
        "2xl": "1920px",
        "3xl": "3840px",
      },
      keyframes: {
        l24: {
          "100%": {
            transform: "rotate(1turn)",
          },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        l24: "l24 1s linear infinite",
        l24Slow: "l24 2s linear infinite",
        l24Slower: "l24 4s linear infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
};

export default config;
