/*
import { getPageHash, setLocalStorageValue } from "shared/utils";
import { create } from "zustand";

type SidebarProps = {
  open: boolean;
  route?: string;
  changeRoute: (route: string) => void;
  changeIsOpen: (open: boolean) => void;
};

export const useSidebarStore = create<SidebarProps>((set) => ({
  open: false,
  route: getPageHash() ?? "/home",
  changeRoute: (route: string) =>
    set((state) => {
      setLocalStorageValue("page", route);
      return { ...state, route };
    }),
  changeIsOpen: (open: boolean) =>
    set((state) => {
      setLocalStorageValue("open", String(open));
      return { ...state, open };
    }),
}));
*/
