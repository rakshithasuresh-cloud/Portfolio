import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // dock icons are small (<60KB) — inline them as data URIs so the whole
    // site ships as a single JS/CSS pair with no extra asset requests.
    assetsInlineLimit: 100000,
  },
})
