import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    isAuth: false,
    accessTocken: "",
  },
  reducers: {},
});

export default userSlice;
