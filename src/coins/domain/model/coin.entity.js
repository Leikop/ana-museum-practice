export class Coin {
  constructor({
    id = 0,
    title = '',
    collectionTypeId = 0,
    yearProduction = 0,
    price = 0,
    rarityScale = '',
    weightGrams = 0,
    conditionGrade = '',
  } = {}) {
    this.id = id;
    this.title = title;
    this.collectionTypeId = collectionTypeId;
    this.yearProduction = yearProduction;
    this.price = price;
    this.rarityScale = rarityScale;
    this.weightGrams = weightGrams;
    this.conditionGrade = conditionGrade;
  }
}
