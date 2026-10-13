import { HistoricalObject } from '../domain/model/historical-object.entity.js';

export class HistoricalObjectAssembler {

  static toEntityFromResource(resource) {
    return new HistoricalObject({
      id: resource.id,
      name: resource.name,
      coinId: resource.CoinId,
      collectionTypeId: resource.collectionTypeId,
      yearProduction: resource.yearProduction,
      coinCollectionId: resource.coinCollectionId,
      summary: resource.summary,
      legends: resource.legends,
      price: resource.price,
      registeredAt: resource.registeredAt,
    });
  }

  static toResourceFromEntity(entity) {
    return {
      id: entity.id,
      name: entity.name,
      CoinId: entity.coinId,
      collectionTypeId: entity.collectionTypeId,
      yearProduction: entity.yearProduction,
      coinCollectionId: entity.coinCollectionId,
      summary: entity.summary,
      legends: entity.legends,
      price: entity.price,
      registeredAt: entity.registeredAt,
    };
  }

  static toEntitiesFromResponse(response) {
    if (response.status !== 200) {
      console.error(`${response.status}, ${response.statusText}`);
      return [];
    }
    const resources = response.data instanceof Array ? response.data : response.data['historicalobjects'];
    return resources.map((resource) => this.toEntityFromResource(resource));
  }
}
