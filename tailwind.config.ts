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
        brand: "var(--color-brand)",
        onbrand: "var(--color-onbrand)",
        surpaceprimary: "var(--color-surpaceprimary)",
        onsurfaceprimary: "var(--color-onsurfaceprimary)",
        onsurfaceprimaryhigh: "var(--color-onsurfaceprimaryhigh)",
        onsurfaceprimaryhighest: "var(--color-onsurfaceprimaryhighest)",
        surfacesecondary: "var(--color-surfacesecondary)",
        onsurfacesecondary: "var(--color-onsurfacesecondary)",
        surfacetertiary: "var(--color-surfacetertiary)",
        onsurfacetertiary: "var(--color-onsurfacetertiary)",
        surfacehover: "var(--color-surfacehover)",
        surfaceinverted: "var(--color-surfaceinverted)",
        onsurfaceinverted: "var(--color-onsurfaceinverted)",
        borderprimary: "var(--color-borderprimary)",
      },
    },
  },
  plugins: [],
};
export default config;
