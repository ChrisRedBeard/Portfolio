import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // I font vengono iniettati come CSS variables da next/font/google
      // e mappati qui per usarli con className="font-display" ecc.
      fontFamily: {
        display: ["var(--font-syne)",      "sans-serif"],
        body:     ["var(--font-dm-sans)",   "sans-serif"],
        mono:     ["var(--font-jetbrains)", "monospace"],
      },
      colors: {
        "bg-base":   "#060810",
        "bg-card":   "#0d1117",
        "bg-border": "#1a2332",
      },
      animation: {
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(0,229,255,0.3)" },
          "50%":       { boxShadow: "0 0 40px rgba(0,229,255,0.6)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
