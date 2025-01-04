import { combineReducers, configureStore } from "@reduxjs/toolkit";

import wordReducer from "entities/Word/store";

const rootReducer = combineReducers({
  wordReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = typeof store;
export type AppDispatch = AppStore["dispatch"];
