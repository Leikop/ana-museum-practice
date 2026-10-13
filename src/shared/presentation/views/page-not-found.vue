<script setup>
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';

const { t } = useI18n();
const route = useRoute();
const router = useRouter();

function backToHome() {
  router.push({ name: 'home' });
}
</script>

<template>
  <div class="flex flex-column align-items-center justify-content-center text-center p-6">
    <i class="pi pi-exclamation-circle text-6xl mb-3" />
    <h1>{{ t('not-found.title') }}</h1>
    <p>{{ t('not-found.message', { path: route.fullPath }) }}</p>
    <pv-button :label="t('not-found.back-home')" icon="pi pi-home" @click="backToHome" />
  </div>
</template>
