import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/auth.slice";
import stateSlice from "./slice/state.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    state: stateSlice,
  },
});
