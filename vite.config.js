import { defineConfig } from 'vite'
// Minimal Vite config: increase chunk size warning threshold
export default defineConfig({
  base: '/Christian-AI-helper/',
  build: {
    chunkSizeWarningLimit: 700,
  },
})
