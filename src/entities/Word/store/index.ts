import { create } from "zustand";

import { WordGetParams, WordInstance } from "@/shared/api/word/model";

type WordStoreProps = {
  words: WordInstance[] | null;
  query: WordGetParams;
  loading: boolean;
  error: string | null;
  pagination?: {
    currentPage: number;
    totalPages: number;
    recordsCount: number;
  };
};

export const useWordStore = create<WordStoreProps>((/*set*/) => ({
  words: [],
  query: {
    limit: 10,
    offset: 0,
  },
  loading: false,
  error: null,
  pagination: {
    currentPage: 1,
    totalPages: 0,
    recordsCount: 0,
  },
}));
