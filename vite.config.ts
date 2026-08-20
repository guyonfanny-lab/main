import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
// Deployed as a GitHub Pages project site at /main/, so assets need that base path.
export default defineConfig({
  base: '/main/',
  plugins: [react(), tailwindcss()],
})
