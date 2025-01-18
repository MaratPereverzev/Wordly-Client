import axios, { AxiosRequestConfig } from "axios";

import {
  DictionarySettingsPutParams,
  DictionarySettingsDeleteParams,
  DictionarySettingsGetParams,
  DictionarySettingsInstance,
  DictionarySettingsPostParams,
} from "./model";

export async function getAllDictionariesSettings(
  params: AxiosRequestConfig<DictionarySettingsGetParams>,
  url: string
) {
  return await axios.get<{ count: number; rows: DictionarySettingsInstance[] }>(
    url,
    params
  );
}

export async function getDictionarySettingsById(
  { data, headers }: AxiosRequestConfig<{ id: string }>,
  url: string
) {
  return await axios.get<DictionarySettingsInstance>(`${url}/${data!.id}`, {
    headers,
  });
}

export async function postDictionarySettings(
  { data, headers }: AxiosRequestConfig<DictionarySettingsPostParams>,
  url: string
) {
  return await axios.post<DictionarySettingsInstance>(url, data, {
    headers,
  });
}

export async function deleteDictionarySettings(
  { data, headers }: AxiosRequestConfig<DictionarySettingsDeleteParams>,
  url: string
) {
  return await axios.delete(`${url}?id=${data!.id}`, { headers });
}

export async function putDictionarySettings(
  { data, headers }: AxiosRequestConfig<DictionarySettingsPutParams>,
  url: string
) {
  return await axios.put(`${url}?dictionaryId=${data!.dictionaryId}`, data, {
    headers,
  });
}
