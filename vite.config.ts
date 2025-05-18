// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    fs: {
      // Permitir servir archivos desde la raíz del proyecto
      allow: ['..']
    }
  }
})