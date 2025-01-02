import axios, { AxiosRequestConfig } from "axios";

import {
  DicitonaryPutParams,
  DictionaryDeleteParams,
  DictionaryGetParams,
  DictionaryInstance,
  DictionaryPostParams,
} from "./model";

export async function getAllDictionaries(
  params: AxiosRequestConfig<DictionaryGetParams>,
  url: string
) {
  return await axios.get<{ count: number; rows: DictionaryInstance[] }>(
    url,
    params
  );
}

export async function getDictionaryById(
  { data, headers }: AxiosRequestConfig<{ id: string }>,
  url: string
) {
  return await axios.get<DictionaryInstance>(`${url}/${data!.id}`, {
    headers,
  });
}

export async function postDictionary(
  { data, headers }: AxiosRequestConfig<DictionaryPostParams>,
  url: string
) {
  return await axios.post<DictionaryInstance>(url, data, {
    headers,
  });
}

export async function deleteDictionary(
  { data, headers }: AxiosRequestConfig<DictionaryDeleteParams>,
  url: string
) {
  return await axios.delete(`${url}?id=${data!.id}`, { headers });
}

export async function putDictionary(
  { data, headers }: AxiosRequestConfig<DicitonaryPutParams & { id: string }>,
  url: string
) {
  return await axios.put(`${url}?id=${data!.id}`, { headers });
}
