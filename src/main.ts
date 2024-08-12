import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import PrimeVue from 'primevue/config'

import App from './App.vue'
import router from './router'
// @ts-ignore
import Theme from '@/assets/primevue'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)
app.use(PrimeVue, {
    unstyled: true,
    pt: Theme
});

app.mount('#app')
