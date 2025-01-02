import { AxiosRequestConfig } from "axios";

import {
  deleteDictionary,
  getAllDictionaries,
  getDictionaryById,
  postDictionary,
  putDictionary,
} from "shared/api/dictionary";
import {
  DicitonaryPutParams,
  DictionaryDeleteParams,
  DictionaryGetParams,
  DictionaryPostParams,
} from "shared/api/dictionary/model";

class Dictionary {
  #URL = "http://localhost:8080/api/dictionary";
  #URL_PRIVATE = "http://localhost:8080/api/private/dictionary";

  async getAll(params: AxiosRequestConfig<DictionaryGetParams>) {
    return await getAllDictionaries(params, this.#URL);
  }

  async getById(params: AxiosRequestConfig<{ id: string }>) {
    return await getDictionaryById(params, this.#URL);
  }

  async post(params: AxiosRequestConfig<DictionaryPostParams>) {
    return await postDictionary(params, this.#URL_PRIVATE);
  }

  async put(params: AxiosRequestConfig<DicitonaryPutParams & { id: string }>) {
    return await putDictionary(params, this.#URL_PRIVATE);
  }

  async delete(params: AxiosRequestConfig<DictionaryDeleteParams>) {
    return await deleteDictionary(params, this.#URL_PRIVATE);
  }
}

const Instance = new Dictionary();

export default Instance;
