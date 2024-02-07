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
        onbrand: "#fff",
        surpaceprimary: "#fff",
        onsurfaceprimary: "#373a3c",
        onsurfaceprimaryhigh: "rgb(107 114 128)",
        onsurfaceprimaryhighest: "rgb(156 163 175)",
        surfacesecondary: "rgb(243 244 246)",
        surfacehover: "rgb(243 244 246)",
        neutral: "#818a91",
        onneutral: "#fff",
      },
    },
  },
  plugins: [],
};
export default config;
