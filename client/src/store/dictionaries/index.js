import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSelectMode: false,
  selectedItems: null,
  selectedItemsCount: 0,
  itemsPerPage: 9,
  page: 1,
  pageCount: 1,
};

const dictionarySlice = createSlice({
  name: "dictionaries",
  initialState,
  reducers: {
    changeSelectMode: (store) => {
      store.isSelectMode = !store.isSelectMode;
    },
    changePage: (store, { payload }) => {
      store.page = payload.page;
    },
  },
});

export const { changeSelectMode, changePage } = dictionarySlice.actions;
export default dictionarySlice.reducer;
