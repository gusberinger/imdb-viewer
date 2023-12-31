import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import PrimeVue from 'primevue/config'

import App from './App.vue'
import router from './router'
// import 'primevue/resources/themes/saga-blue/theme.css';
// const mode = localStorage.getItem('vueuse-color-scheme')
// if (mode === 'dark') {
//   import('primevue/resources/themes/lara-dark-teal/theme.css')
// } else {
//     import('primevue/resources/themes/lara-light-teal/theme.css')
// }
// import 'primevue/resourc es/themes/lara-light-teal/theme.css'
const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)
app.use(PrimeVue)

app.mount('#app')
