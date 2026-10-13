<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import useCollectionStore from '../../application/collection.store.js';

const props = defineProps({
  collection: { type: Object, required: true },
});

const { t, locale } = useI18n();
const store = useCollectionStore();

const items = computed(() => store.getHistoricalObjectsByCollectionId(props.collection.id));
const totalPrice = computed(() => store.getTotalPriceByCollectionId(props.collection.id));
const availableSize = computed(() => store.getAvailableSize(props.collection));

const currencyFormatter = computed(
  () => new Intl.NumberFormat(locale.value, { style: 'currency', currency: 'USD' }),
);

function formatPrice(value) {
  return currencyFormatter.value.format(value);
}
</script>

<template>
  <pv-card>
    <template #header>
      <h3 class="p-3 pb-0">{{ collection.title }}</h3>
    </template>
    <template #content>
      <p v-if="!items.length" class="text-color-secondary">{{ t('home.no-historical-object') }}</p>
      <ul v-else class="list-none p-0 m-0">
        <li v-for="item in items" :key="item.id" class="flex justify-content-between py-1">
          <span>{{ item.name }}</span>
          <span>{{ formatPrice(item.price) }}</span>
        </li>
      </ul>
    </template>
    <template #footer>
      <div class="flex justify-content-between text-sm">
        <span>{{ t('home.total-price') }}: <strong>{{ formatPrice(totalPrice) }}</strong></span>
        <span>{{ t('home.available-size') }}: <strong>{{ availableSize }}</strong></span>
      </div>
    </template>
  </pv-card>
</template>
