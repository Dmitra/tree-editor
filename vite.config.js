import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import loadCssModulePlugin from 'vite-plugin-load-css-module'

export default defineConfig(({ command, mode }) => ({
  base: './',
  build: {
    sourcemap: true,
  },
  css: {
    modules: {
      scopeBehaviour: 'global',
    },
  },
  server: {
    host: true,
    port: 8067,
  },
  plugins: [
    react(),
    loadCssModulePlugin({
      include: id => (
        id.split('?').slice(0, 1).join('').endsWith('css') && !id.includes('node_modules')
      ),
    }),
  ],
}))