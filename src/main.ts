import { createApp } from 'vue'
import './style.css'
import App from './app/App.vue'
import router from './router';
import PrimeVue from 'primevue/config';
import 'primeicons/primeicons.css';
import Aura from '@primevue/themes/aura';
import ToastService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice';
import { Tooltip } from 'primevue';
import { createPinia } from 'pinia'
import 'primeicons/primeicons.css';


const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(ToastService);
app.use(ConfirmationService);
app.directive('tooltip', Tooltip)
app.use(router)
app.use(PrimeVue, { 
    unstyled:false,
    ripple:true,
    theme: {
        preset: Aura,
        options : {
          darkModeSelector: '',
          cssLayer: {
            name: 'primevue',
            order: 'tailwind-base, primevue, tailwind-utilities,css'
        }
        } 
    }
});
app.mount('#app')
