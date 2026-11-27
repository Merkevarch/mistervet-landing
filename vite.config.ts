import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    allowedHosts: true,
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // El code-splitting con React.lazy generará múltiples chunks.
    // Ajustamos el warning limit para que no moleste con el chunk de BlogPost
    // que arrastra react-markdown (~120KB).
    chunkSizeWarningLimit: 600,
  },
})
