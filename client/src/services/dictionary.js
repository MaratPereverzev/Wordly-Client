import axios from "axios";

class Dictionary {
  #URL = "http://localhost:8080/api/private/dictionary";

  async getAll(params) {
    return await axios.get(this.#URL, params);
  }

  async post({ data, headers }) {
    return await axios.post(this.#URL, data, { headers });
  }
}

const Instance = new Dictionary();

export default Instance;
