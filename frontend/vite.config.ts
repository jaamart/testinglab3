import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dns from "dns"
dns.setDefaultResultOrder("ipv4first")

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api': 'http://localhost:3000'
    }
  }
})
