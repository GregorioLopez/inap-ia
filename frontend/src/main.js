import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from './router';

import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/aura-light-green/theme.css';
import 'primeicons/primeicons.css';

import './style.css';
import App from './App.vue';

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(PrimeVue);

app.mount('#app');
