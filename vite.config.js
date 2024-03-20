import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/SKCET-CGPA/', // Specify your GitHub Pages URL path
  plugins: [react()],
})
