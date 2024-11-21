import axios from "axios";

class Dictionary {
  #URL = "http://localhost:8080/api/private/dictionary";

  async getAll(params) {
    return await axios.get(this.#URL, params);
  }

  async getById({ query, headers }) {
    return await axios.get(`${this.#URL}/${query.id}`, { headers });
  }

  async post({ data, headers }) {
    return await axios.post(this.#URL, data, { headers });
  }

  async delete({ data, headers }) {
    return await axios.delete(`${this.#URL}?id=${data.id}`, { headers });
  }
}

const Instance = new Dictionary();

export default Instance;
