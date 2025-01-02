import { combineReducers, configureStore } from "@reduxjs/toolkit";

import userReducer from "./user";
import dicitonaryReducer from "entities/Dictionary/store";
import sidebarReducer from "./sidebar";
import wordReducer from "entities/Word/store";

const rootReducer = combineReducers({
  userReducer,
  dicitonaryReducer,
  sidebarReducer,
  wordReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = typeof store;
export type AppDispatch = AppStore["dispatch"];
