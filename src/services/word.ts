import axios, { AxiosRequestConfig } from "axios";

class Word {
  #URL = "http://localhost:8080/api/word";
  #URL_PRIVATE = "http://localhost:8080/api/private/word";

  async getAll({ data, headers }: AxiosRequestConfig = {}) {
    const queryString = Object.keys(data.query)
      .map((queryKey) => `${queryKey}=${data.query[queryKey]}`)
      .join("&");
    return await axios.get(`${this.#URL}?${queryString}`, {
      headers,
    });
  }

  async getById({ data, headers }: AxiosRequestConfig) {
    return await axios.get(`${this.#URL}/${data.query.id}`, { headers });
  }

  async post({ data, headers }: AxiosRequestConfig) {
    return await axios.post(this.#URL_PRIVATE, data, { headers });
  }

  async delete({ data, headers }: AxiosRequestConfig) {
    return await axios.delete(`${this.#URL_PRIVATE}?id=${data.query.id}`, {
      headers,
    });
  }
}

const Instance = new Word();

export default Instance;
