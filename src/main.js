import { createApp } from 'vue';
import router from './router';
import i18n from './i18n';
import '@styles/main.scss';
import App from './App.vue';

const app = createApp(App);

app.use(router).use(i18n).mount('#app');
