import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Configuracion para diferentes modos (staging, production)
  define: {
    'import.meta.env.VITE_ENV': JSON.stringify(process.env.VITE_ENV || 'development'),
  },
})
