import { createRouter, createWebHistory } from 'vue-router';
import useTranslation from './i18n/useTranslation.js';
import Home from './views/Home.vue';
import What from './views/What.vue';
import About from './views/About.vue';
import Skills from './views/Skills.vue';
import Experience from './views/Experience.vue';
import Education from './views/Education.vue';
import Menu from './views/Menu.vue';
import Privacy from './views/Privacy.vue';
import Contacts from './views/Contacts.vue';

const routes = [
  {
    path: '/:locale?',
    beforeEnter: useTranslation.routeMiddleware,
    children: [
      {
        path: '',
        name: 'home',
        component: Home,
      },
      {
        path: 'what',
        name: 'what',
        component: What,
      },
      {
        path: 'about',
        name: 'about',
        component: About,
      },
      {
        path: 'skills',
        name: 'skills',
        component: Skills,
      },
      {
        path: 'experience',
        name: 'experience',
        component: Experience,
      },
      {
        path: 'education',
        name: 'education',
        component: Education,
      },
      {
        path: 'menu',
        name: 'menu',
        component: Menu,
      },
      {
        path: 'contacts',
        name: 'contacts',
        component: Contacts,
      },
      {
        path: 'privacy',
        name: 'privacy',
        component: Privacy,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes,
});

export default router;
