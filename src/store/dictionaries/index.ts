import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type dictionariesReducerProps = {
  pagination?: { page?: number; pageCount?: number; recordsCount?: number };
  query?: { limit?: number; offset?: number; caption?: string };
  mode?: { isSelectMode?: boolean; selectedItems: { id: number }[] };
};

const initialState: dictionariesReducerProps = {
  pagination: {
    page: 1,
    pageCount: 1,
  },
  query: {
    limit: 6,
    offset: 0,
    caption: undefined,
  },
  mode: {
    isSelectMode: false,
    selectedItems: [],
  },
};

const dictionarySlice = createSlice({
  name: "dictionaries",
  initialState,
  reducers: {
    setPagination: (
      store,
      { payload }: PayloadAction<dictionariesReducerProps>
    ) => {
      store.pagination!.pageCount = Math.ceil(
        (payload.pagination!.pageCount ?? 1) / store.query!.limit!
      );
    },
    changeSelectMode: (store) => {
      store.mode!.isSelectMode = !store.mode!.isSelectMode;
    },
    changePage: (
      store,
      { payload }: PayloadAction<dictionariesReducerProps>
    ) => {
      store.pagination!.page = payload.pagination!.page;
      store.query!.offset =
        (payload.pagination!.page! - 1) * store.query!.limit!;
    },
    changeChecked: (store, { payload }) => {
      const index = store.mode!.selectedItems!.findIndex(
        (dictionary) => dictionary.id === payload.id
      );

      if (index === -1) store.mode!.selectedItems!.push(payload);
      else store.mode!.selectedItems!.splice(index, 1);
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
