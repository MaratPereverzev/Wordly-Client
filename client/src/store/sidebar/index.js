import { createSlice } from "@reduxjs/toolkit";
import { setLocalStorageValue, getPageHash } from "@utils";

const initialState = {
  open: false,
  page: getPageHash() ?? "/home",
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    changePage: (state, { payload }) => {
      state.page = payload.route;

      setLocalStorageValue("page", payload.route);
    },
    changeOpenState: (state, { payload }) => {
      state.open = payload.open;

      setLocalStorageValue("open", payload.open);
    },
  },
});

export const { changePage, changeOpenState } = sidebarSlice.actions;
export default sidebarSlice.reducer;
