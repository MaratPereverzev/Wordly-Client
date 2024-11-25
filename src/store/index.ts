import { combineReducers, configureStore } from "@reduxjs/toolkit";

import userReducer from "./user";
import dicitonariesReducer from "./dictionaries";
import sidebarReducer from "./sidebar";

const rootReducer = combineReducers({
  userReducer,
  dicitonariesReducer,
  sidebarReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = typeof rootReducer;
export type AppStore = typeof store;
export type AppDispatch = AppStore["dispatch"];
