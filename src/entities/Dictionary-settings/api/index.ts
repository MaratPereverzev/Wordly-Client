import {
  DictionarySettingsGetParams,
  DictionarySettingsPostParams,
  DictionarySettingsPutParams,
} from "@/shared/api/dictionary-settings/model";
import {
  deleteDictionarySettings,
  getAllDictionariesSettings,
  getDictionarySettingsById,
  postDictionarySettings,
  putDictionarySettings,
} from "@/shared/api";
import { AxiosRequestConfig } from "axios";
import { DictionaryDeleteParams } from "@/shared/api/dictionary/model";

class DictionarySettings {
  #URL = "http://localhost:8080/api/dictionarySettings";

  async getAll(params: AxiosRequestConfig<DictionarySettingsGetParams>) {
    return await getAllDictionariesSettings(params, this.#URL);
  }

  async getById(params: AxiosRequestConfig<{ id: string }>) {
    return await getDictionarySettingsById(params, this.#URL);
  }

  async post(params: AxiosRequestConfig<DictionarySettingsPostParams>) {
    return await postDictionarySettings(params, this.#URL);
  }

  async put(params: AxiosRequestConfig<DictionarySettingsPutParams>) {
    return await putDictionarySettings(params, this.#URL);
  }

  async delete(params: AxiosRequestConfig<DictionaryDeleteParams>) {
    return await deleteDictionarySettings(params, this.#URL);
  }
}

const Instance = new DictionarySettings();

export default Instance;
