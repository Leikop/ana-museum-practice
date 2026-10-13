import axios from 'axios';

const museumApiUrl = import.meta.env.VITE_MUSEUM_API_URL;

export class BaseApi {

  #http;

  constructor() {
    this.#http = axios.create({
      baseURL: museumApiUrl,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  get http() {
    return this.#http;
  }
}
