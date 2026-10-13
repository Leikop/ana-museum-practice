<script setup>
import { computed, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import useCollectionStore from '../../application/collection.store.js';
import useCoinsStore from '../../../coins/application/coins.store.js';

const { t } = useI18n();
const router = useRouter();
const collectionStore = useCollectionStore();
const coinsStore = useCoinsStore();

onMounted(() => {
  if (!collectionStore.collectionsLoaded) collectionStore.fetchCollections();
  if (!collectionStore.historicalObjectsLoaded) collectionStore.fetchHistoricalObjects();
  if (!coinsStore.coinsLoaded) coinsStore.fetchCoins();
});

const selectedCollectionId = ref(null);
const selectedCoinId = ref(null);

const selectedCollection = computed(
  () => collectionStore.collections.find((c) => c.id === selectedCollectionId.value) ?? null,
);

const availableCoins = computed(() => {
  if (!selectedCollection.value) return [];
  return coinsStore.getCoinsByCollectionTypeId(selectedCollection.value.collectionType);
});

const selectedCoin = computed(() => availableCoins.value.find((c) => c.id === selectedCoinId.value) ?? null);

const collectionHasAvailableSize = computed(() => {
  if (!selectedCollection.value) return true;
  return collectionStore.getAvailableSize(selectedCollection.value) > 0;
});

const canCreate = computed(
  () => !!selectedCollection.value && !!selectedCoin.value && collectionHasAvailableSize.value,
);

function onCollectionChange() {
  selectedCoinId.value = null;
}

function create() {
  if (!canCreate.value) return;
  collectionStore
    .addHistoricalObject({ collection: selectedCollection.value, coin: selectedCoin.value })
    .then(() => router.push({ name: 'home' }))
    .catch(() => {

    });
}

function cancel() {
  router.push({ name: 'home' });
}
</script>

<template>
  <div>
    <h1>{{ t('new-historical-object.title') }}</h1>
    <p class="text-color-secondary">{{ t('new-historical-object.subtitle') }}</p>

    <div class="flex flex-column gap-4 mt-4" style="max-width: 28rem">
      <div class="flex flex-column gap-2">
        <label for="collection-select">{{ t('new-historical-object.collection') }}</label>
        <pv-select
          id="collection-select"
          v-model="selectedCollectionId"
          :options="collectionStore.collections"
          option-label="title"
          option-value="id"
          :placeholder="t('new-historical-object.collection-placeholder')"
          @change="onCollectionChange"
        />
        <small v-if="selectedCollection && !collectionHasAvailableSize" class="text-red-500">
          {{ t('new-historical-object.collection-full') }}
        </small>
      </div>

      <div class="flex flex-column gap-2">
        <label for="coin-select">{{ t('new-historical-object.coin') }}</label>
        <pv-select
          id="coin-select"
          v-model="selectedCoinId"
          :options="availableCoins"
          option-label="title"
          option-value="id"
          :disabled="!selectedCollection || !collectionHasAvailableSize"
          :placeholder="t('new-historical-object.coin-placeholder')"
        />
      </div>

      <div class="flex gap-2 mt-2">
        <pv-button :label="t('new-historical-object.create')" :disabled="!canCreate" @click="create" />
        <pv-button :label="t('new-historical-object.cancel')" severity="secondary" outlined @click="cancel" />
      </div>
    </div>
  </div>
</template>
