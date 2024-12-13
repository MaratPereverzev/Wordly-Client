import axios, { AxiosRequestConfig } from "axios";

import { AuthInstance, AuthPostParams } from "./model";

export async function postAuth(
  { data, headers }: AxiosRequestConfig<AuthPostParams>,
  url: string
) {
  return await axios.post<AuthInstance>(url, data, {
    headers,
  });
}
