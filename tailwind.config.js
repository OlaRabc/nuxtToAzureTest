/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      spacing: {
        "1/12": "8.33%",
        "2/12": "16.66%",
        "3/12": "25%",
        "4/12": "33.3%",
        "5/12": "41.66%",
        "6/12": "50%",
        "7/12": "58.33%",
        "8/12": "66.66%",
        "9/12": "75%",
        "10/12": "93.33%",
        "11/12": "91.66%",
        full: "100%",
      },
    },
  },
  plugins: [],
  safelist: [
    {
      pattern: /basis-/,
      variants: ["sm", "md", "lg", "xl", "xxl"],
    },
    {
      pattern: /ml-/,
      variants: ["sm", "md", "lg", "xl", "xxl"],
    },
  ],
};
