import { Collection } from '../domain/model/collection.entity.js';

export class CollectionAssembler {

  static toEntityFromResource(resource) {
    return new Collection({ ...resource });
  }

  static toEntitiesFromResponse(response) {
    if (response.status !== 200) {
      console.error(`${response.status}, ${response.statusText}`);
      return [];
    }
    const resources = response.data instanceof Array ? response.data : response.data['collection'];
    return resources.map((resource) => this.toEntityFromResource(resource));
  }
}
