import axios from "axios";

class Dictionary {
  #URL = "http://localhost:8080/api/private/dictionary";

  async getAll(params) {
    return await axios.get(this.#URL, params);
  }
}

export default new Dictionary();
