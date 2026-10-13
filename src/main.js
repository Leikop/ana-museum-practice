import { createApp } from 'vue';
import './style.css';
import App from './app.vue';
import i18n from './i18n.js';
import PrimeVue from 'primevue/config';
import Lara from '@primeuix/themes/lara';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import { Button, Card, Column, DataTable, Drawer, Select, SelectButton, Toolbar } from 'primevue';
import router from './router.js';
import pinia from './pinia.js';

createApp(App)
  .use(i18n)
  .use(PrimeVue, { theme: { preset: Lara }, ripple: true })
  .component('pv-button', Button)
  .component('pv-card', Card)
  .component('pv-column', Column)
  .component('pv-data-table', DataTable)
  .component('pv-drawer', Drawer)
  .component('pv-select', Select)
  .component('pv-select-button', SelectButton)
  .component('pv-toolbar', Toolbar)
  .use(router)
  .use(pinia)
  .mount('#app');
