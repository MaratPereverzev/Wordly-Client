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
    changeCurrentPage: (currentPage: number) => void;
    setTotalPages: (count: number) => void;
  };
  selectedDictionary: DictionaryInstance | null;
  mode: {
    isSelectMode?: boolean;
    selectedItems: string[];
    changeSelectMode: () => void;
  };
  changeSelectedDictionaries: (id: string) => void;
  changeQuerySearch: (data?: { [index: string]: string }) => void;
};

export const useDictionaryStore = create<DicitonaryListStoreParams>((set) => ({
  dictionaries: null,
  query: undefined,
  loading: false,
  error: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    recordsCount: 0,
    changeCurrentPage: (currentPage: number) =>
      set((state) => ({
        ...state,
        pagination: { ...state.pagination, currentPage },
      })),
    setTotalPages: (count: number) =>
      set((state) => ({
        ...state,
        pagination: { ...state.pagination, totalPages: count },
      })),
  },
  selectedDictionary: null,
  mode: {
    isSelectMode: false,
    selectedItems: [],
    changeSelectMode: () =>
      set((state) => ({
        ...state,
        mode: { ...state.mode, isSelectMode: !state.mode.isSelectMode },
      })),
  },

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
