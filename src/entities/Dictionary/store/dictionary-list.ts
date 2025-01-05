/*
import {
  DictionaryGetParams,
  DictionaryInstance,
} from "@/shared/api/dictionary/model";
import { create } from "zustand";

type DicitonaryListStoreParams = {
  dictionaries: DictionaryInstance[] | null;
  query?: DictionaryGetParams;
  loading: boolean;
  error: string | null;
  pagination: {
    currentPage: number;
    totalPages: number;
    recordsCount: number;
  };
  selectedDictionary: DictionaryInstance | null;
  mode: { isSelectMode?: boolean; selectedItems: string[] };
  setTotalPages: (count: number) => void;
  changeSelectMode: () => void;
  changeCurrentPage: (currentPage: number) => void;
  changeSelectedDictionaries: (id: string) => void;
  changeQuerySearch: () => void;
};

export const useDistionaryStore = create<DicitonaryListStoreParams>((set) => ({
  dictionaries: null,
  query: undefined,
  loading: false,
  error: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    recordsCount: 0,
  },
  selectedDictionary: null,
  mode: { isSelectMode: false, selectedItems: [] },
  setTotalPages: (count: number) =>
    set((state) => ({
      ...state,
      pagination: { ...state.pagination, totalPages: count },
    })),
  changeSelectMode: () =>
    set((state) => ({
      ...state,
      mode: { ...state.mode, isSelectMode: !state.mode.isSelectMode },
    })),
  changeCurrentPage: (currentPage: number) =>
    set((state) => ({
      ...state,
      pagination: { ...state.pagination, currentPage },
    })),
  changeSelectedDictionaries: (id: string) =>
    set((state) => {
      const foundDictionaryIndex = state.mode.selectedItems.findIndex(
        (dictionaryId) => dictionaryId === id
      );

      if (foundDictionaryIndex === -1) state.mode.selectedItems.push(id);
      else state.mode.selectedItems.splice(foundDictionaryIndex);
      return { ...state };
    }),
  changeQuerySearch: () => {},
}));
*/
