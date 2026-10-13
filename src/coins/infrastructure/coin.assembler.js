import { Coin } from '../domain/model/coin.entity.js';

export class CoinAssembler {
  static toEntityFromResource(resource) {
    return new Coin({ ...resource });
  }

  static toEntitiesFromResponse(response) {
    if (response.status !== 200) {
      console.error(`${response.status}, ${response.statusText}`);
      return [];
    }
    const resources = response.data instanceof Array ? response.data : response.data['coins'];
    return resources.map((resource) => this.toEntityFromResource(resource));
  }
}
