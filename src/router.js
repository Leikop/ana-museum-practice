import { createRouter, createWebHistory } from 'vue-router';
import Home from './collection/presentation/views/home.vue';

const newHistoricalObjectItem = () => import('./collection/presentation/views/new-historical-object-item.vue');
const pageNotFound = () => import('./shared/presentation/views/page-not-found.vue');

const routes = [
  { path: '/home', name: 'home', component: Home, meta: { title: 'Home' } },
  {
    path: '/historicalobjects/items/new',
    name: 'new-historical-object-item',
    component: newHistoricalObjectItem,
    meta: { title: 'New Historical Object Item' },
  },
  { path: '/', redirect: '/home' },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: pageNotFound, meta: { title: 'Page Not Found' } },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to) => {
  document.title = `ANA Museum - ${to.meta['title']}`;
  return true;
});

export default router;
