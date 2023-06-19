/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/index.html",
    "./client/app/*.js",
    "./client/features/**/*.js",
    "./server/**/*.js",
  ],
  theme: {
    extend: {
      keyframes: {
        "slide-in": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        "slide-in": "slide-in 600s linear infinite",
      },
    },
  },
  variants: {},
  plugins: [],
};
