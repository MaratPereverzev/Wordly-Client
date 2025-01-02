import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { setLocalStorageValue, getPageHash } from "shared/utils";

type SidebarReducerProps = {
  open?: boolean;
  route?: string;
};

const initialState: SidebarReducerProps = {
  open: false,
  route: getPageHash() ?? "/home",
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    changePage: (state, { payload }: PayloadAction<SidebarReducerProps>) => {
      state.route = payload.route;

      setLocalStorageValue("page", payload.route!);
    },
    changeOpenState: (
      state,
      { payload }: PayloadAction<SidebarReducerProps>
    ) => {
      state.open = payload.open;

      setLocalStorageValue("open", String(payload.open));
    },
  },
});

export const { changePage, changeOpenState } = sidebarSlice.actions;
export default sidebarSlice.reducer;
