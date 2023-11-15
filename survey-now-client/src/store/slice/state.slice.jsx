import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeNav: ""
};

const stateSlice = createSlice({
  name: "state",
  initialState,
  reducers: {
    setActiveNav: (state, action) => {
      state.role = action.payload;
    }
  },
});

export const { setActiveNav } =
  stateSlice.actions;

export default stateSlice.reducer;
