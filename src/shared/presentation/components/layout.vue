<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import LanguageSwitcher from './language-switcher.vue';

const { t } = useI18n();

const logoDevUrl = import.meta.env.VITE_LOGO_DEV_URL;
const logoDevToken = import.meta.env.VITE_LOGO_DEV_TOKEN;
const logoSrc = logoDevToken ? `${logoDevUrl}?token=${logoDevToken}` : logoDevUrl;

const sidebarVisible = ref(true);

function toggleSidebar() {
  sidebarVisible.value = !sidebarVisible.value;
}
</script>

<template>
  <pv-toolbar class="border-noround">
    <template #start>
      <pv-button icon="pi pi-bars" text @click="toggleSidebar" />
      <img :src="logoSrc" alt="American Numismatic Association" height="40" class="ml-2" />
    </template>
    <template #end>
      <span class="hidden md:inline text-sm line-height-3 ml-3" style="max-width: 40rem; display: inline-block">
        {{ t('app.tagline') }}
      </span>
    </template>
  </pv-toolbar>

  <div class="flex">
    <pv-drawer v-model:visible="sidebarVisible" :modal="false" :dismissable="false" position="left">
      <nav class="flex flex-column h-full">
        <ul class="list-none p-0 m-0 flex-grow-1">
          <li class="mb-2">
            <router-link to="/home" class="flex align-items-center gap-2 p-2 border-round no-underline">
              <i class="pi pi-home" />
              <span>{{ t('nav.home') }}</span>
            </router-link>
          </li>
          <li class="mb-2">
            <router-link
              to="/historicalobjects/items/new"
              class="flex align-items-center gap-2 p-2 border-round no-underline"
            >
              <i class="pi pi-plus-circle" />
              <span>{{ t('nav.new-historical-object') }}</span>
            </router-link>
          </li>
        </ul>
        <language-switcher />
      </nav>
    </pv-drawer>

    <main class="flex-grow-1 p-4">
      <router-view />
    </main>
  </div>
</template>
