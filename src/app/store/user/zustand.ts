import {
  dispatchEvent,
  getLocalStorageValue,
  setLocalStorageValue,
} from "shared/utils";
import { create } from "zustand";

type UserStoreProps = {
  accessToken: string;
  login: (accessToken: string) => void;
  logout: () => void;
};

export const useUserStore = create<UserStoreProps>((set) => ({
  accessToken: getLocalStorageValue("accessToken") ?? "",
  login: (accessToken: string) =>
    set((state) => {
      dispatchEvent("snackbarTrigger", {
        message: "Access granted",
        status: "success",
      });

      setLocalStorageValue("accessToken", accessToken);

      return { ...state, accessToken };
    }),
  logout: () => set((state) => state),
}));
