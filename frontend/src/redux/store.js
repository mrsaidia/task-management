import { configureStore } from "@reduxjs/toolkit";
import AuthCounter from "./AuthSlice";

export default configureStore({
  reducer: {
    AuthStore: AuthCounter,
  },
});
