import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  server: [],
};

export const server = createSlice({
  name: "server",
  initialState,
  reducers: {
    setServer: (state, action) => {
      state.server = action.payload;
    },
  },
});

export const { setServer } = server.actions;
export default server.reducer;
