import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        clinic: {
          ink: "#0f172a",
          accent: "#2dd4bf",
        },
      },
      keyframes: {
        "hero-zoom": {
          from: { transform: "scale(1)" },
          to: { transform: "scale(1.08)" },
        },
      },
      animation: {
        "hero-zoom": "hero-zoom 18s ease-out infinite alternate",
      },
    },
  },
  plugins: [],
};

export default config;
