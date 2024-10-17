import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [vue(), vueDevTools()],
  base: mode === 'production' ? '/a3-fit5032/' : '/', // 根据环境设置 base 路径
  resolve: {
    alias: {
      '@': new URL('./src', import.meta.url).pathname
    }
  }
}))
