<script setup>
import { onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import useCollectionStore from '../../application/collection.store.js';
import CollectionSummary from '../components/collection-summary.vue';

const { t } = useI18n();
const store = useCollectionStore();

onMounted(() => {
  if (!store.collectionsLoaded) store.fetchCollections();
  if (!store.historicalObjectsLoaded) store.fetchHistoricalObjects();
});
</script>

<template>
  <div>
    <h1>{{ t('home.title') }}</h1>
    <p>{{ t('home.content') }}</p>

    <section class="mt-4">
      <h2>{{ t('home.collections-section') }}</h2>
      <h3 class="text-color-secondary">{{ t('home.collections-title') }}</h3>

      <div class="grid">
        <div v-for="collection in store.collections" :key="collection.id" class="col-12 md:col-6">
          <collection-summary :collection="collection" />
        </div>
      </div>
    </section>

    <div v-if="store.errors.length" class="text-red-500 mt-3">
      {{ t('errors.occurred') }}: {{ store.errors.map((e) => e.message).join(', ') }}
    </div>
  </div>
</template>
