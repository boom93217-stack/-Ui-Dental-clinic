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
    },
  },
  plugins: [],
};

export default config;
