import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    include: [
      'react-intersection-observer',
      'embla-carousel-react',
      'embla-carousel-autoplay',
      'lenis',
    ],
  },
  build: {
    target: 'es2020',
    sourcemap: false,
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('gsap')) return 'motion-gsap'
            if (id.includes('framer-motion') || id.includes('/motion/')) {
              return 'motion-framer'
            }
            if (id.includes('embla-carousel')) return 'embla'
            if (id.includes('lucide-react')) return 'icons'
            if (
              id.includes('react-dom') ||
              id.includes('/react/') ||
              id.includes('scheduler')
            ) {
              return 'react-vendor'
            }
          }
        },
      },
    },
  },
})
