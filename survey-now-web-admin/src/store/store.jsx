import { configureStore } from "@reduxjs/toolkit";
import stateReducer from "./slices/state.slice";

//Store in redux is used to store state of application
export const store = configureStore({
  reducer: {
    state: stateReducer,
  },
});
