import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#080809",
        surface: "#0F1012",
        "surface-raised": "#151619",
        "surface-card": "#18191D",
        gold: {
          50: "#FCF9EE",
          100: "#F9F2D7",
          200: "#F2E4AD",
          300: "#EAD481",
          400: "#DFC052",
          500: "#D4AF37", // Primary luxury gold
          600: "#B89226",
          700: "#916E1D",
          800: "#6E521B",
          900: "#4B3817",
          glow: "rgba(212, 175, 55, 0.25)",
        },
        borderGold: "rgba(212, 175, 55, 0.22)",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        sans: ["var(--font-geist-sans)", "sans-serif"],
      },
      boxShadow: {
        gold: "0 0 25px -5px rgba(212, 175, 55, 0.3)",
        "gold-glow": "0 0 45px -8px rgba(212, 175, 55, 0.45)",
        luxury: "0 20px 40px -15px rgba(0, 0, 0, 0.8)",
      },
      keyframes: {
        doorLeft: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        doorRight: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(100%)" },
        },
        glowPulse: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "door-open-left": "doorLeft 1.2s cubic-bezier(0.77, 0, 0.175, 1) forwards",
        "door-open-right": "doorRight 1.2s cubic-bezier(0.77, 0, 0.175, 1) forwards",
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
        shimmer: "shimmer 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
