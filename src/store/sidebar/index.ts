import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setLocalStorageValue, getPageHash } from "utils";

type sidebarReducerProps = {
  open?: boolean;
  route?: string;
};

const initialState: sidebarReducerProps = {
  open: false,
  route: getPageHash() ?? "/home",
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    changePage: (state, { payload }: PayloadAction<sidebarReducerProps>) => {
      state.route = payload.route;

      setLocalStorageValue("page", payload.route!);
    },
    changeOpenState: (
      state,
      { payload }: PayloadAction<sidebarReducerProps>
    ) => {
      state.open = payload.open;

      setLocalStorageValue("open", String(payload.open));
    },
  },
});

export const { changePage, changeOpenState } = sidebarSlice.actions;
export default sidebarSlice.reducer;
