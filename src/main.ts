import './assets/base.css'
import './style.css'
import 'animate.css'
import 'vue-loading-overlay/dist/css/index.css'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import 'swiper/css/thumbs'
import 'swiper/css/a11y'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Notifications from '@kyvg/vue3-notification'
import PrimeVue from 'primevue/config'
import Noir from './presets/Noir.js'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(Notifications)
app.use(PrimeVue, {
  theme: {
    preset: Noir,
    options: {
      prefix: 'p',
      darkModeSelector: '.p-dark',
      cssLayer: false,
    },
  },
})
app.use(createPinia())
app.use(router)
app.mount('#app')
