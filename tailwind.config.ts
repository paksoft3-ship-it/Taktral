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
        navy: "#0D2B55",
        steel: "#2E5F8A",
        gold: "#B8954A",
        charcoal: "#1E1E1E",
        smoke: "#505050",
        frost: "#E8EDF4",
        offwhite: "#F5F7FA",
        "border-light": "#E0E6F0",
      },
      fontFamily: {
        display: ["Manrope", "Inter", "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      borderRadius: {
        DEFAULT: "0px",
        sm: "0px",
        md: "0px",
        lg: "0px",
        xl: "0px",
        "2xl": "0px",
        "3xl": "0px",
        full: "9999px",
      },
      boxShadow: {
        technical: "0 8px 32px rgba(13,43,85,0.10)",
        "technical-lg": "0 16px 48px rgba(13,43,85,0.14)",
      },
      letterSpacing: {
        "tight-eng": "-0.03em",
      },
      backgroundImage: {
        "grid-pattern":
          "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%230D2B55' fill-opacity='0.04' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E\")",
        "dot-grid":
          "radial-gradient(rgba(13, 43, 85, 0.05) 1.5px, transparent 1.5px)",
        "blueprint-lines":
          "linear-gradient(rgba(184, 149, 74, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(184, 149, 74, 0.08) 1px, transparent 1px)",
      },
      backgroundSize: {
        "dot-grid-size": "24px 24px",
        "blueprint-size": "40px 40px",
      },
    },
  },
  plugins: [],
};

export default config;
