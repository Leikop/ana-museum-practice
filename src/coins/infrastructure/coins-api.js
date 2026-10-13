import axios from 'axios';

const collectionTypesApiUrl = import.meta.env.VITE_COLLECTION_TYPES_API_URL;
const coinsApiUrl = import.meta.env.VITE_COINS_API_URL;

export class CoinsApi {

  #http;

  constructor() {
    this.#http = axios.create({ headers: { 'Content-Type': 'application/json' } });
  }

  getCollectionTypes() {
    return this.#http.get(collectionTypesApiUrl);
  }

  getCoins() {
    return this.#http.get(coinsApiUrl);
  }
}
