import { AxiosBasicRequestParams, FileData } from "shared/types";

export type DictionaryInstance = {
  id: string;
  caption: string;
  description: string;
  medium?: {
    id: number;
    caption: string | null;
    description: string | null;
    path: string;
  };
};

export type DictionaryGetParams = Partial<
  Omit<DictionaryInstance, "medium"> & AxiosBasicRequestParams
>;

export type DictionaryPostParams = Omit<DictionaryInstance, "id" | "medium"> & {
  medium: FileData;
};

export type DicitonaryPutParams = Partial<DictionaryPostParams>;

export type DictionaryDeleteParams = { id: string };
