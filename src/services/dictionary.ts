import axios, { AxiosRequestConfig, AxiosRequestHeaders } from "axios";

class Dictionary {
  #URL = "http://localhost:8080/api/private/dictionary";

  async getAll(params: AxiosRequestConfig) {
    return await axios.get(this.#URL, params);
  }

  async getById({ data, headers }: AxiosRequestConfig) {
    return await axios.get(`${this.#URL}/${data.query.id}`, { headers });
  }

  async post({ data, headers }: AxiosRequestConfig) {
    return await axios.post(this.#URL, data, { headers });
  }

  async delete({ data, headers }: AxiosRequestConfig) {
    return await axios.delete(`${this.#URL}?id=${data.query.id}`, { headers });
  }
}

const Instance = new Dictionary();

export default Instance;
