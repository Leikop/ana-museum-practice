export class Collection {

  constructor({ id = 0, title = '', country = '', state = '', collectionType = 0, size = 0 } = {}) {
    this.id = id;
    this.title = title;
    this.country = country;
    this.state = state;
    this.collectionType = collectionType;
    this.size = size;
  }
}
