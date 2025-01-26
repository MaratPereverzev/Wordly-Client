import { AxiosBasicRequestParams } from "@/shared/types";

export type WordInstance = {
  id: string;
  caption: string;
  description: string;
  dictionaryId: string;
  createdAt: string;
};

export type WordGetParams = Partial<
  Omit<WordInstance, "media"> & AxiosBasicRequestParams
>;

export type WordPostParams = Omit<WordInstance, "id">;

export type WordPutParams = Partial<WordPostParams>;

export type WordDeleteParams = { id: string };
