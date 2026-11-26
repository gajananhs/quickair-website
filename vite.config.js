import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  server: { port: 5173 },
  // Three.js ships as its own lazy chunk (~135 kB gzip); silence the size warning for it.
  build: { chunkSizeWarningLimit: 600, copyPublicDir: !isSsrBuild },
  // The prerender bundle (src/entry-server.jsx) runs in Node at build time; bundle its
  // dependencies too, because some (GSAP) ship ES modules that Node cannot import directly.
  ssr: { noExternal: true },
}))
