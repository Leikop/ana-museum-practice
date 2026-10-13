import { BaseApi } from '../../shared/infrastructure/base-api.js';
import { BaseEndpoint } from '../../shared/infrastructure/base-endpoint.js';

const collectionsEndpointPath = import.meta.env.VITE_COLLECTIONS_ENDPOINT_PATH;
const historicalObjectsEndpointPath = import.meta.env.VITE_HISTORICAL_OBJECTS_ENDPOINT_PATH;

export class CollectionApi extends BaseApi {

  #collectionsEndpoint;

  #historicalObjectsEndpoint;

  constructor() {
    super();
    this.#collectionsEndpoint = new BaseEndpoint(this, collectionsEndpointPath);
    this.#historicalObjectsEndpoint = new BaseEndpoint(this, historicalObjectsEndpointPath);
  }

  getCollections() {
    return this.#collectionsEndpoint.getAll();
  }

  getCollectionById(id) {
    return this.#collectionsEndpoint.getById(id);
  }

  getHistoricalObjects() {
    return this.#historicalObjectsEndpoint.getAll();
  }

  createHistoricalObject(resource) {
    return this.#historicalObjectsEndpoint.create(resource);
  }
}
