/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      animation: {
        "scale-up-center": "scale-up-center 0.6s ease-in-out  infinite alternate-reverse both",
        "animate-cloud": "animate-cloud 40s ease-in-out -10s  infinite",
      },
      keyframes: {
        "scale-up-center": {
          "0%": {
            transform: "scale(.5)",
          },
          to: {
            transform: "scale(1)",
          },
        },
        "animate-cloud": {
          "0%": {
            transform: " translateX(100%)",
          },
          "100%": {
            transform: " translateX(-350%)",
          },
        },
      },
    },
  },
  plugins: [
    require("prettier-plugin-tailwindcss"),
    require("tailwind-scrollbar")({ nocompatible: true }),
  ],
};
