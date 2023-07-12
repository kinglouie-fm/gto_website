import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/gto_website/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  }
})



// CHAT GPT FILE STRUCTURE
// - src/
//   - assets/
//     - Aventador.SRS-3.jpg
//     - GTO_round.jpg
//     - image-gto-ben911.JPG
//   - components/
//     - About.vue
//     - Contact.vue
//     - Home.vue
//     - TeamMember.vue
//   - router/
//     - index.js
//   - views/
//     - AboutView.vue
//     - ContactView.vue
//     - HomeView.vue
//   - App.vue
//   - main.js
// - public/
//   - Aventador.SRS-3.jpg
//   - GTO_round.jpg
//   - image-gto-ben911.JPG
// - index.html
// - vite.config.js
// - package.json
// - package-lock.json
