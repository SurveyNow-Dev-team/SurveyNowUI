import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  role: undefined,
  isAuthenticated: false,
  email: undefined,
  avatarUrl: undefined,
  fullName: undefined,
  gender: undefined,
  point: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setRole: (state, action) => {
      state.role = action.payload;
    },
    setAuthentication: (state, action) => {
      state.isAuthenticated = action.payload;
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
    setGender: (state, action) => {
      state.gender = action.payload;
    },
    setPoint: (state, action) => {
      state.point = action.payload;
    },
  },
});

export const {
  setRole,
  setAuthentication,
  setEmail,
  setAvatarUrl,
  setFullName,
  setGender,
  setPoint,
} = authSlice.actions;

export default authSlice.reducer;
