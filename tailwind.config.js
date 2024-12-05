/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero-bg-dark': "url('/BG-Grid.svg')",
        'hero-bg-light': "url('/BG-Grid-Light.svg')",
        'grad-dark':
            'linear-gradient(180deg, rgba(15, 23, 42, 0.4) 0%, rgba(2, 8, 23) 0%);',
        'faq-dark':
            'linear-gradient(180deg, rgba(2,8,23) 0%, rgba(2, 8, 23)0%)',
        'grad-light':
            'linear-gradient(180deg, rgba(241, 245, 249, 0.4) 0%, rgba(255, 255, 255, 0.4) 100%)',
      },
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