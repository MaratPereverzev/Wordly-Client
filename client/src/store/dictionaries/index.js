import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSelectMode: false,
  selectedItems: [],
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
    changeChecked: (store, { payload }) => {
      const index = store.selectedItems.findIndex(
        (dictionary) => dictionary.id === payload.id
      );

      if (index === -1) store.selectedItems.push(payload);
      else store.selectedItems.splice(index, 1);
    },
  },
});

export const { changeSelectMode, changePage, changeChecked } =
  dictionarySlice.actions;
export default dictionarySlice.reducer;
