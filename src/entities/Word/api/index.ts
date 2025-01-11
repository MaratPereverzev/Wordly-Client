import { AxiosRequestConfig } from "axios";

import {
  deleteWord,
  getAllWords,
  getWordById,
  postWord,
  putWord,
} from "@/shared/api/word";
import {
  WordPutParams,
  WordDeleteParams,
  WordGetParams,
  WordPostParams,
} from "@/shared/api/word/model";

class Word {
  #URL = "http://localhost:8080/api/dictionary";
  #URL_PRIVATE = "http://localhost:8080/api/private/dictionary";

  async getAll(params: AxiosRequestConfig<WordGetParams>) {
    return await getAllWords(params, this.#URL);
  }

  async getById(params: AxiosRequestConfig<{ id: string }>) {
    return await getWordById(params, this.#URL);
  }

  async post(params: AxiosRequestConfig<WordPostParams>) {
    return await postWord(params, this.#URL_PRIVATE);
  }

  async put(params: AxiosRequestConfig<WordPutParams & { id: string }>) {
    return await putWord(params, this.#URL_PRIVATE);
  }

  async delete(params: AxiosRequestConfig<WordDeleteParams>) {
    return await deleteWord(params, this.#URL_PRIVATE);
  }
}

const Instance = new Word();

export default Instance;
