import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import Components from 'unplugin-vue-components/vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/vue-uikit/',
  plugins: [
    vue(),
    Components({
      dirs: ['src/components'],
      deep: true,
      dts: 'src/components.d.ts',
    }),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    environment: 'jsdom',
  },
})
