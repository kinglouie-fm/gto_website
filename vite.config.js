import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()], // Configures Vue.js plugin for Vite.
  // build: {
  //   rollupOptions: {
  //     /* 
  //     Specifies external dependencies that should not be bundled by Rollup.
  //     Rollup is a js module bundler that takes multiple JavaScript files, along with their dependencies 
  //     and combines them into a single, more manageable file (or multiple files) 
  //     for deployment in a web application.
  //     */ 
  //     external: ['./src/assets/GTO_round.png', './src/assets/gto_logo.png', './src/assets/Aventador.SRS-3.jpg', './src/assets/image-gto-ben911.jpeg',
  //                 './src/assets/Aventador.SRS-3-mobile.jpg', './src/assets/McLaren765LT-7.jpg', './src/assets/sample_avatar.jpg']
  //   },
  // },
})
