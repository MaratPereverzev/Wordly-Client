import axios from "axios";

class Word {
  #URL = "http://localhost:8080/api/word";
  #URL_PRIVATE = "http://localhost:8080/api/private/word";

  async getAll({ query, headers }) {
    const queryString = Object.keys(query)
      .map((queryKey) => `${queryKey}=${query[queryKey]}`)
      .join("&");
    return await axios.get(`${this.#URL}?${queryString}`, {
      headers,
    });
  }

  async getById({ query, headers }) {
    return await axios.get(`${this.#URL}/${query.id}`, { headers });
  }

  async post({ data, headers }) {
    return await axios.post(this.#URL_PRIVATE, data, { headers });
  }

  async delete({ data, headers }) {
    return await axios.delete(`${this.#URL_PRIVATE}?id=${data.id}`, {
      headers,
    });
  }
}

const Instance = new Word();

export default Instance;
