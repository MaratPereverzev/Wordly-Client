import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppStore, RootState } from "store";

export const useAppStore = (): TypedUseSelectorHook<RootState> => useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
