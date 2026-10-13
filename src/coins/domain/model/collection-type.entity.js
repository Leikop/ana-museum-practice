export class CollectionType {
  constructor({
    id = 0,
    name = '',
    description = '',
    originCountry = '',
    establishedYear = 0,
    material = '',
    isExhibited = false,
    curatorName = '',
  } = {}) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.originCountry = originCountry;
    this.establishedYear = establishedYear;
    this.material = material;
    this.isExhibited = isExhibited;
    this.curatorName = curatorName;
  }
}
