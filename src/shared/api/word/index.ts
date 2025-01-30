import axios, { AxiosRequestConfig } from "axios";

import {
  WordGetParams,
  WordPostParams,
  WordPutParams,
  WordDeleteParams,
  WordInstance,
} from "./model";

export async function getAllWords(
  params: AxiosRequestConfig<WordGetParams>,
  url: string
) {
  return await axios.get<{ count: number; rows: WordInstance[] }>(url, params);
}

export async function getWordById(
  { data, headers }: AxiosRequestConfig<{ id: string }>,
  url: string
) {
  return await axios.get<WordInstance>(`${url}/${data!.id}`, {
    headers,
  });
}

export async function importWord(
  { data, headers }: AxiosRequestConfig<{ id: string; dictionaryId: number }>,
  url: string
) {
  return await axios.post<{ id: string; dictionaryId: number }>(url, data, {
    headers,
  });
}

export async function postWord(
  { data, headers }: AxiosRequestConfig<WordPostParams>,
  url: string
) {
  return await axios.post<WordInstance>(url, data, {
    headers,
  });
}

export async function putWord(
  { data, headers }: AxiosRequestConfig<WordPutParams & { id: string }>,
  url: string
) {
  return await axios.put(`${url}?id=${data!.id}`, { headers });
}

export async function deleteWord(
  { data, headers }: AxiosRequestConfig<WordDeleteParams>,
  url: string
) {
  return await axios.delete(`${url}?id=${data!.id}`, { headers });
}
