/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/index.html",
    "./client/app/*.js",
    "./client/features/**/*.js",
    "./server/**/*.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
