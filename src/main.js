import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// IMPORT bootstrap
import 'bootstrap/dist/css/bootstrap.css'

// IMPORT social media icons with font-awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faFacebook, faInstagram} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// ADD imported icons to library.
library.add(faFacebook, faInstagram)

const app = createApp(App)
app.use(router)
app.mount('#app')
// RENDER icons properlu
app.component('fa', FontAwesomeIcon)

import 'bootstrap/dist/js/bootstrap.js'