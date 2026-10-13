import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { CollectionApi } from '../infrastructure/collection-api.js';
import { CollectionAssembler } from '../infrastructure/collection.assembler.js';
import { HistoricalObjectAssembler } from '../infrastructure/historical-object.assembler.js';
import { HistoricalObject } from '../domain/model/historical-object.entity.js';

const collectionApi = new CollectionApi();

const useCollectionStore = defineStore('collection', () => {
  const collections = ref([]);
  const historicalObjects = ref([]);
  const errors = ref([]);
  const collectionsLoaded = ref(false);
  const historicalObjectsLoaded = ref(false);

  const dataReady = computed(() => collectionsLoaded.value && historicalObjectsLoaded.value);

  function fetchCollections() {
    collectionApi
      .getCollections()
      .then((response) => {
        collections.value = CollectionAssembler.toEntitiesFromResponse(response);
        collectionsLoaded.value = true;
      })
      .catch((error) => errors.value.push(error));
  }

  function fetchHistoricalObjects() {
    collectionApi
      .getHistoricalObjects()
      .then((response) => {
        historicalObjects.value = HistoricalObjectAssembler.toEntitiesFromResponse(response);
        historicalObjectsLoaded.value = true;
      })
      .catch((error) => errors.value.push(error));
  }

  function getHistoricalObjectsByCollectionId(collectionId) {
    return historicalObjects.value.filter((item) => item.coinCollectionId === collectionId);
  }

  function getTotalPriceByCollectionId(collectionId) {
    return getHistoricalObjectsByCollectionId(collectionId).reduce((total, item) => total + item.price, 0);
  }

  function getAvailableSize(collection) {
    return collection.size - getHistoricalObjectsByCollectionId(collection.id).length;
  }

  function addHistoricalObject({ collection, coin }) {
    if (getAvailableSize(collection) <= 0) {
      errors.value.push(new Error('Collection has no available size.'));
      return Promise.reject(new Error('Collection has no available size.'));
    }

    const draft = new HistoricalObject({
      id: Date.now(),
      name: coin.title,
      coinId: coin.id,
      collectionTypeId: collection.collectionType,
      yearProduction: coin.yearProduction,
      coinCollectionId: collection.id,
      summary: coin.conditionGrade,
      legends: '',
      price: coin.price,
      registeredAt: new Date().toISOString(),
    });

    const resource = HistoricalObjectAssembler.toResourceFromEntity(draft);

    return collectionApi
      .createHistoricalObject(resource)
      .then((response) => {
        const created = HistoricalObjectAssembler.toEntityFromResource(response.data);
        historicalObjects.value.push(created);
        return created;
      })
      .catch((error) => {
        errors.value.push(error);
        throw error;
      });
  }

  return {
    collections,
    historicalObjects,
    errors,
    collectionsLoaded,
    historicalObjectsLoaded,
    dataReady,
    fetchCollections,
    fetchHistoricalObjects,
    getHistoricalObjectsByCollectionId,
    getTotalPriceByCollectionId,
    getAvailableSize,
    addHistoricalObject,
  };
});

export default useCollectionStore;
