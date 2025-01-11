import { create } from "zustand";

type SettingsStoreProps = {
  theme: "light" | "dark";
  iconSize: number;
  changeIconSize: (iconSize: number) => void;
};

export const useSettingsStore = create<SettingsStoreProps>((set) => ({
  theme: "light",
  iconSize: 24,
  changeIconSize: (iconSize: number) =>
    set((state) => {
      return { ...state, iconSize };
    }),
}));
