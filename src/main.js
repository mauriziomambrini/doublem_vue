import { createApp } from 'vue';
import { createHead } from '@unhead/vue';
import router from './router';
import i18n from './i18n';
import '@styles/main.scss';
import App from './App.vue';

const app = createApp(App);
const head = createHead();

app.use(head).use(router).use(i18n).mount('#app');
