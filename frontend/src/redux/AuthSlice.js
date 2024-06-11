import { createSlice } from "@reduxjs/toolkit";

export const AuthSlice = createSlice({
  name: "AuthCounter",
  initialState: {
    isUserAuthenticated: false,
    jwtToken: "",
  },
  reducers: {
    changeUserAuthentication: (state, action) => {
      state.isUserAuthenticated = action.payload;
    },
    changeJWTToken: (state, action) => {
      state.jwtToken = action.payload;
    },
  },
});

export const {
  changeUserAuthentication,
  changeJWTToken
} = AuthSlice.actions;

export default AuthSlice.reducer;
