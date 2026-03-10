import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ["var(--font-heading)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      screens: {
        xs: "475px",
      },
      animation: {
        "fade-in-up": "fade-in-up 0.65s cubic-bezier(0.22,1,0.36,1) both",
        "scroll-marquee": "scroll-marquee 35s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
