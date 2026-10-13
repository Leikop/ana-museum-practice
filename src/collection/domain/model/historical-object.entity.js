export class HistoricalObject {

  constructor({
    id = 0,
    name = '',
    coinId = 0,
    collectionTypeId = 0,
    yearProduction = 0,
    coinCollectionId = 0,
    summary = '',
    legends = '',
    price = 0,
    registeredAt = '',
  } = {}) {
    this.id = id;
    this.name = name;
    this.coinId = coinId;
    this.collectionTypeId = collectionTypeId;
    this.yearProduction = yearProduction;
    this.coinCollectionId = coinCollectionId;
    this.summary = summary;
    this.legends = legends;
    this.price = price;
    this.registeredAt = registeredAt;
  }
}
