import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderItems: "",
};

export const dashboard = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setOrderItems: (state, action) => {
      state.orderItems = action.payload;
    },
  },
});

export const { setOrderItems } = dashboard.actions;
export default dashboard.reducer;
