/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors :{
        primary: {
          light: "#d9ddee",
          DEFAULT: "#9492db",
          dark: "#7164c0",
        },
        secondary: {
          light: "#93C5FD",
          DEFAULT: "#3B82F6",
          dark: "#1E3A8A"
        },
      }
    },
  },
  plugins: [],
}