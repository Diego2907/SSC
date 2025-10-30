/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sora: ['"Sora"', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#0b3b78',
          dark: '#0b1220',
          light: '#1f3b6f',
        },
        yellow: {
          custom: '#ffd600',
        }
      },
    },
  },
  plugins: [],
}