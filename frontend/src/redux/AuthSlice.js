import { createSlice } from "@reduxjs/toolkit";

export const AuthSlice = createSlice({
  name: "AuthCounter",
  initialState: {
    isUserAuthenticated: false,
  },
  reducers: {
    changeUserAuthentication: (state, action) => {
      state.isUserAuthenticated = action.payload;
    },
  },
});

export const {
  changeUserAuthentication,
} = AuthSlice.actions;

export default AuthSlice.reducer;
