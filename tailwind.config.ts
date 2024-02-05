import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      padding: "2rem",
    },
    extend: {
      colors: {
        brand: "#fb923c",
        primary: "#55595c",
      },
    },
  },
  plugins: [],
};
export default config;
