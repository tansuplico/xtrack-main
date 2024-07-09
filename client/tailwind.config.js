/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xsm: "375px",
      sm: "425px",
      xmd: "550px",
      md: "768px",
      xlg: "900px",
      lg: "1024px",
      xmlg: "1175px",
      mlg: "1300px",
      ctg: "1388px",
      xl: "1440px",
      xxl: "2560px",
    },
    extend: {},
  },
  plugins: [],
};
