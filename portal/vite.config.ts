import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import ElementPlus from 'unplugin-element-plus/vite'

// https://vitejs.dev/config/
export default defineConfig({
  // server: {
  //   open: true,
  //   port: process.env.VITE_CLI_PORT,
  //   proxy: {
  //     // 把key的路径代理到target位置
  //     // detail: https://cli.vuejs.org/config/#devserver-proxy
  //     [process.env.VITE_BASE_API]: { // 需要代理的路径   例如 '/api'
  //       target: `${process.env.VITE_BASE_PATH}:${process.env.VITE_SERVER_PORT}/`, // 代理到 目标路径
  //       changeOrigin: true,
  //       rewrite: path => path.replace(new RegExp('^' + process.env.VITE_BASE_API), ''),
  //     }
  //   },
  // },
  plugins: [vue(),ElementPlus(),AutoImport({
    resolvers: [ElementPlusResolver()],
  }),
  Components({
    resolvers: [ElementPlusResolver()],
  }),],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
