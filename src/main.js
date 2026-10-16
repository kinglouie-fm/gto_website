import { createSiteApp } from './app.js'
import { normalizePath } from './data/seo.js'
import 'bootstrap/dist/css/bootstrap.css'
import './assets/css/style.css'

import '@fortawesome/fontawesome-svg-core/styles.css'

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

const { app, router } = createSiteApp({
    // The generic 404 HTML can be served at a different URL from its rendered route.
    hydrate: document.getElementById('app').dataset.prerendered === normalizePath(window.location.pathname)
})

router.isReady().then(() => {
  // initial pageview
  sendPageview(router.currentRoute.value.fullPath)

  // subsequent navigations
  router.afterEach((to) => {
    sendPageview(to.fullPath)
  })

  app.mount('#app')
})
