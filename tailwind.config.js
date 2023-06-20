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
        "slide-and-bounce": {
          "0%": { transform: "translate(-100%, -10%)" },
          "25%": { transform: "translate(-50%, 10%)" },
          "50%": { transform: "translate(0, -10%)" },
          "75%": { transform: "translate(50%, 10%)" },
          "100%": { transform: "translate(100%, -10%)" },
        },
      },
      animation: {
        "slide-and-bounce": "slide-and-bounce 240s ease-in-out infinite",
      },
    },
    variants: {},
    plugins: [],
  },
};
