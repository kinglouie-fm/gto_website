import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap/dist/css/bootstrap.css'
import './assets/css/style.css'

import { faFacebook, faInstagram, faTiktok} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'

library.add(faFacebook, faInstagram, faTiktok)

createApp(App).use(store).use(router).component('font-awesome-icon', FontAwesomeIcon).mount('#app')

import 'bootstrap/dist/js/bootstrap.js'