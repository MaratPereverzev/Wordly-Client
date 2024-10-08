import { createSlice } from "@reduxjs/toolkit";
import { dispatchEvent } from "@utils";

const initialState = {
  user: null,
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
      dispatchEvent("onLogin");
    },
  },
});

export const { loginAction } = userSlice.actions;
export default userSlice.reducer;
