import { createApp, createSSRApp } from 'vue'
import { config, library } from '@fortawesome/fontawesome-svg-core'
import { faFacebook, faInstagram, faTiktok } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import App from './App.vue'
import { createSiteRouter } from './router/index.js'
import store from './store/index.js'

config.autoAddCss = false
library.add(faFacebook, faInstagram, faTiktok)

export const createSiteApp = ({ history, hydrate = false } = {}) => {
    const router = createSiteRouter(history)
    const app = (hydrate ? createSSRApp : createApp)(App)
        .use(store)
        .use(router)
        .component('font-awesome-icon', FontAwesomeIcon)

    return { app, router }
}
