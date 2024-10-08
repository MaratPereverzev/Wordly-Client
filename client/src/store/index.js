import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user";
import dicitonariesSlice from "./dictionaries";

export const store = configureStore({
  reducer: {
    user: userSlice,
    dictionaries: dicitonariesSlice,
  },
});
