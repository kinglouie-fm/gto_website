import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
 
import 'bootstrap/dist/css/bootstrap.css' // IMPORT bootstrap

// IMPORT social media icons with font-awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faFacebook, faInstagram} from '@fortawesome/free-brands-svg-icons'
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faFacebook, faInstagram, faBars) // ADD imported icons to library.

const app = createApp(App) // Create a Vue Application Instance
app.use(router) // Use Vue Router
app.mount('#app') // Mount the Vue Application to an HTML Element
app.component('fa', FontAwesomeIcon) // RENDER icons properlu

import 'bootstrap/dist/js/bootstrap.js' // IMPORT bootstrap