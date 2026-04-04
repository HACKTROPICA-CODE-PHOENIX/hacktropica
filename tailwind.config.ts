import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        heading: ["Space Grotesk", "sans-serif"],
        body: ["Outfit", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      colors: {
        brand: {
          500: "#FF4F00", // Vibrant Neon Orange
          600: "#E04500",
          glow: "rgba(255, 79, 0, 0.4)",
        },
        dark: {
          bg: "#030303",
          surface: "#0A0A0A",
          panel: "rgba(20, 20, 20, 0.6)",
          border: "#1A1A1A",
          borderHover: "#333333",
        },
      },
      animation: {
        blob: "blob 15s infinite alternate",
        "blob-reverse": "blob-reverse 20s infinite alternate",
        "fade-in-up": "fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
      keyframes: {
        blob: {
          "0%": { transform: "translate(0px, 0px) scale(1)" },
          "100%": { transform: "translate(50px, -50px) scale(1.2)" },
        },
        "blob-reverse": {
          "0%": { transform: "translate(0px, 0px) scale(1)" },
          "100%": { transform: "translate(-50px, 50px) scale(1.1)" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }: { addUtilities: Function }) {
      addUtilities({
        ".scrollbar-hide": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        },
      });
    },
  ],
};

export default config;
