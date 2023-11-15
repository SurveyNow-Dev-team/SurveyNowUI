import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  role: undefined,
  email: undefined,
  avatarUrl: undefined,
  fullName: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setRole: (state, action) => {
      state.role = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setAvatarUrl: (state, action) => {
      state.avatarUrl = action.payload;
    },
    setFullName: (state, action) => {
      state.fullName = action.payload;
    },
  },
});

export const { setRole, setEmail, setAvatarUrl, setFullName } =
  authSlice.actions;

export default authSlice.reducer;
