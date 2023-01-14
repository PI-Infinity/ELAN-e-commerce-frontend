import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  startTime: new Date(
    new Date().getFullYear(),
    new Date().getMonth() - 1,
    new Date().getDate()
  ).toString(),
  endTime: new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    new Date().getDate()
  ).toString(),
  startDate: new Date(
    new Date().getFullYear(),
    new Date().getMonth() - 1,
    new Date().getDate()
  ).toString(),
  endDate: new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    new Date().getDate()
  ).toString(),
};

export const calendar = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    setStartTime: (state, action) => {
      state.startTime = action.payload;
    },
    setEndTime: (state, action) => {
      state.endTime = action.payload;
    },
    setStartDate: (state, action) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action) => {
      state.endDate = action.payload;
    },
  },
});

export const { setStartTime, setEndTime, setStartDate, setEndDate } =
  calendar.actions;
export default calendar.reducer;
