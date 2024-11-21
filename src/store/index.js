import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./user";
import dicitonariesSlice from "./dictionaries";
import sidebarSlice from "./sidebar";

export const store = configureStore({
  reducer: {
    user: userSlice,
    dictionaries: dicitonariesSlice,
    sidebar: sidebarSlice,
  },
});
