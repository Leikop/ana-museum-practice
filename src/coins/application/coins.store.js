import { defineStore } from 'pinia';
import { ref } from 'vue';
import { CoinsApi } from '../infrastructure/coins-api.js';
import { CollectionTypeAssembler } from '../infrastructure/collection-type.assembler.js';
import { CoinAssembler } from '../infrastructure/coin.assembler.js';

const coinsApi = new CoinsApi();

const useCoinsStore = defineStore('coins', () => {
  const collectionTypes = ref([]);
  const coins = ref([]);
  const errors = ref([]);
  const collectionTypesLoaded = ref(false);
  const coinsLoaded = ref(false);

  function fetchCollectionTypes() {
    coinsApi
      .getCollectionTypes()
      .then((response) => {
        collectionTypes.value = CollectionTypeAssembler.toEntitiesFromResponse(response);
        collectionTypesLoaded.value = true;
      })
      .catch((error) => errors.value.push(error));
  }

  function fetchCoins() {
    coinsApi
      .getCoins()
      .then((response) => {
        coins.value = CoinAssembler.toEntitiesFromResponse(response);
        coinsLoaded.value = true;
      })
      .catch((error) => errors.value.push(error));
  }

  function getCoinsByCollectionTypeId(collectionTypeId) {
    const typeId = parseInt(collectionTypeId);
    return coins.value.filter((coin) => coin.collectionTypeId === typeId);
  }

  return {
    collectionTypes,
    coins,
    errors,
    collectionTypesLoaded,
    coinsLoaded,
    fetchCollectionTypes,
    fetchCoins,
    getCoinsByCollectionTypeId,
  };
});

export default useCoinsStore;
