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
          500: "#20c76f",
          600: "#13a95a"
        }
      },
      boxShadow: {
        soft: "0 18px 50px rgba(7, 20, 39, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
