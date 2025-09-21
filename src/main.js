import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap/dist/css/bootstrap.css'
import './assets/css/style.css'

// 1) import the core FA styles
import '@fortawesome/fontawesome-svg-core/styles.css'
// 2) disable the auto-injection
import { config, library } from '@fortawesome/fontawesome-svg-core'
config.autoAddCss = false
import { faFacebook, faInstagram, faTiktok} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faFacebook, faInstagram, faTiktok)

import 'bootstrap/dist/js/bootstrap.js'

function sendPageview(path, title = document.title) {
    // guard in case gtag hasn't loaded yet
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
        window.gtag('event', 'page_view', {
            page_title: title,
            page_location: window.location.href,
            page_path: path,
        })
    }
}

const app = createApp(App).use(store).use(router).component('font-awesome-icon', FontAwesomeIcon)

router.isReady().then(() => {
  // initial pageview
  sendPageview(router.currentRoute.value.fullPath)

  // subsequent navigations
  router.afterEach((to) => {
    sendPageview(to.fullPath)
  })

  app.mount('#app')
})