/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Montserrat", "sans-serif"],
    },
    extend: {
      colors: {
        "stg-color": "#1D3049",
        "link-header": "#000",
        link: "#1A3675",
        primary: "#1A3675",
        primary2: "#304a82",
        primary3: "#475E90",
        "link-hover": "#5e7dbf",
        secondary: "#F3C400",
        "primary-bg": "#ffffff",
        "secondary-bg": "#efefef",
        "primary-txt": "#000000",
        "secondary-txt": "#8c8c8c",
        "border-secondary": "#cfcfcf",
        "border-separator": "rgba(207, 207, 207, 0.5)",
      },
      screens: {
        "2xs": "420px",
        "3xl": "1900px",
      },
      boxShadow: {
        thin: "rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px",
        thick: "0px 30px 54px 0px rgba(0, 0, 0, 0.15)",
        button: "0 2px 0 rgba(26, 54, 117, 0.1)",
        footer:
          "0 -4px 6px -1px rgb(0 0 0 / 0.1), 0 -2px 4px -2px rgb(0 0 0 / 0.1)",
        "3xl": "0 35px 60px -20px rgb(0 0 0 / 0.25)",
      },
      keyframes: {
        slideDownAndFade: {
          from: { opacity: 0, transform: "translateY(-2px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        slideDownAndFade:
          "slideDownAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
      },
      aspectRatio: {
        "1024/768": "1024 / 768",
      },
    },
  },
  plugins: [],
};
