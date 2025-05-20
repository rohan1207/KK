import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  
  base: '/',

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  server: {
    port: 5174, // Only used for local dev
    historyApiFallback: true, // Enable client-side routing
  },

  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
    // Copy _redirects file to build output
    copyPublicDir: true,
    outDir: 'dist',
    assetsDir: 'assets', // Optional: default is 'assets'
  },
})
