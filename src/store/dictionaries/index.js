import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
    setPagination: (store, { payload }) => {
      store.pagination.pageCount = Math.ceil(
        (payload?.count ?? 1) / store.query.limit
      );
    },
    changeSelectMode: (store) => {
      store.mode.isSelectMode = !store.mode.isSelectMode;
    },
    changePage: (store, { payload }) => {
      store.pagination.page = payload.page;
      store.query.offset = (payload.page - 1) * store.query.limit;
    },
    changeChecked: (store, { payload }) => {
      const index = store.mode.selectedItems.findIndex(
        (dictionary) => dictionary.id === payload.id
      );

      if (index === -1) store.mode.selectedItems.push(payload);
      else store.mode.selectedItems.splice(index, 1);
    },
    changeQuerySearch: (store, { payload }) => {
      store.query.caption = payload.caption;
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
