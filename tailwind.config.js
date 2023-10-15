/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'hack': ['"Hack Nerd Font"', defaultTheme.fontFamily.hack],
    },
    extend: {},
  },
  plugins: [],
}