import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#071427",
          900: "#0a1c35",
          800: "#102846"
        },
        profit: {
          50: "#f0fdf6",
          100: "#dcfce9",
          400: "#4ade80",
          500: "#20c76f",
          600: "#13a95a"
        }
      },
      boxShadow: {
        soft:        "0 18px 50px rgba(7, 20, 39, 0.08)",
        card:        "0 2px 8px rgba(7, 20, 39, 0.05)",
        "card-hover":"0 20px 56px rgba(7, 20, 39, 0.10)",
        "glow-green":"0 4px 14px rgba(32, 199, 111, 0.40)",
        "glow-sm":   "0 0 10px rgba(32, 199, 111, 0.55)",
      },
      transitionDuration: {
        "250": "250ms",
      },
      backdropBlur: {
        xl: "20px",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.25rem",
      }
    }
  },
  plugins: []
};

export default config;
