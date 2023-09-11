import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/gto_website/',
  plugins: [vue()],
  build: {
    rollupOptions: {
      external: ['src/assets/GTO_round.png', 'src/assets/Aventador.SRS-3.jpg', 'src/assets/image-gto-ben911.JPG'],
    },
  },
})

// FILE STRUCTURE
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
