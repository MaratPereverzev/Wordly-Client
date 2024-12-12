import { AxiosBasicRequestParams } from "@/shared/types";

export type DictionaryInstance = {
  id: string;
  caption: string;
  description: string;
  media?: string;
};

export type DictionaryGetParams = Partial<
  Omit<DictionaryInstance, "media"> & AxiosBasicRequestParams
>;

export type DictionaryPostParams = Omit<DictionaryInstance, "id">;

export type DicitonaryPutParams = Partial<DictionaryPostParams>;

export type DictionaryDeleteParams = { id: string };
