/** @type {import('tailwindcss').Config} */
import { fontFamily as _fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screen: {
        sm: "576px",
        md: "960px",
        lg: "1440px",
      },
    },
    fontFamily: {
      sans: ["Inter", ..._fontFamily.sans],
    },
  },
  plugins: [],
};
