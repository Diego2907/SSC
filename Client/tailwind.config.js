/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        poppins: ['"Poppins"', 'sans-serif'],
        sora: ['"Sora"', 'sans-serif'],
        futura: ['"Futura"', 'sans-serif'],
      },
      colors: {
        // Paleta Oficial Pantone
        'pantone-blue': '#1D4289',      // Pantone 7687 C - Azul primario
        'pantone-red': '#DA291C',        // Pantone 485 C - Rojo
        'pantone-yellow': '#FFE900',     // Pantone 803 C - Amarillo
        'pantone-gray': '#838383',       // Pantone Cool Gray 10 U
        'pantone-green': '#44D62C',      // Pantone 802 C - Verde
        'pantone-white': '#FFFFFF',      // Blanco primario
        // Colores heredados para compatibilidad
        primary: {
          DEFAULT: '#1D4289',
          dark: '#0b1220',
          light: '#1f3b6f',
        },
        yellow: {
          custom: '#FFE900',
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}