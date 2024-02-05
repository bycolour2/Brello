/** @type {import('tailwindcss').Config} */
import { fontFamily as _fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        sm: "576px",
        md: "960px",
        lg: "1440px",
      },
      boxShadow: {
        button: "box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
    fontFamily: {
      sans: ["Inter", ..._fontFamily.sans],
    },
  },
  plugins: [],
};
