import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  DictionaryInstance,
  DictionaryGetParams,
} from "shared/api/dictionary/model";

type DictionaryReducerProps = {
  dictionaries: DictionaryInstance[] | null;
  query: DictionaryGetParams;
  loading: boolean;
  error: string | null;
  pagination: {
    currentPage: number;
    totalPages: number;
    recordsCount: number;
  };
  selectedDictionary: DictionaryInstance | null;
  mode: { isSelectMode?: boolean; selectedItems: { id: string }[] };
};

const initialState: DictionaryReducerProps = {
  dictionaries: [],
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
  selectedDictionary: null,
  mode: { isSelectMode: false, selectedItems: [] },
};

const dictionarySlice = createSlice({
  name: "dictionaries",
  initialState,
  reducers: {
    setPagination: (store, { payload }: PayloadAction<{ count: number }>) => {
      store.pagination.totalPages = Math.ceil(
        (payload.count ?? 1) / store.query.limit!
      );
    },
    changeSelectMode: (state) => {
      state.mode.isSelectMode = !state.mode.isSelectMode;
    },
    changePage: (store, { payload }: PayloadAction<{ pageToShow: number }>) => {
      store.pagination.currentPage = payload.pageToShow;
      store.query.offset = (payload.pageToShow - 1) * store.query.limit!;
    },
    changeChecked: (store, { payload }) => {
      const index = store.mode.selectedItems.findIndex(
        (dictionary) => dictionary.id === payload.id
      );

      if (index === -1) store.mode!.selectedItems.push(payload);
      else store.mode.selectedItems.splice(index, 1);
    },
    changeQuerySearch: (store, { payload }) => {
      store.query!.caption = payload.caption;
    },
  },
});

export const {
  changeSelectMode,
  changePage,
  changeChecked,
  setPagination,
  changeQuerySearch,
} = dictionarySlice.actions;
export default dictionarySlice.reducer;
