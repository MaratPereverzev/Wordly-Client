import { createSlice } from "@reduxjs/toolkit";
import {
  dispatchEvent,
  setLocalStorageValue,
  getLocalStorageValue,
} from "@utils";

const initialState = {
  accessToken: getLocalStorageValue("accessToken"),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginAction: (state, { payload }) => {
      state.user = payload;

      dispatchEvent("snackbarTrigger", {
        message: "Access granted",
        status: "success",
      });

      setLocalStorageValue("accessToken", payload.accessToken);
    },
  },
});

export const { loginAction } = userSlice.actions;
export default userSlice.reducer;
