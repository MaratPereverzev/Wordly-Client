import { createSlice } from "@reduxjs/toolkit";
import {
  dispatchEvent,
  setLocalStorageValue,
  getLocalStorageValue,
} from "utils";

type userReducerProps = {
  accessToken: string | null;
};
const initialState: userReducerProps = {
  accessToken: getLocalStorageValue("accessToken"),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginAction: (state, { payload }) => {
      state.accessToken = payload.accessToken;

      if (payload.accessToken) {
        dispatchEvent("snackbarTrigger", {
          message: "Access granted",
          status: "success",
        });
      }

      setLocalStorageValue("accessToken", payload.accessToken);
    },
  },
});

export const { loginAction } = userSlice.actions;
export default userSlice.reducer;
