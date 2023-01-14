import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  title: "",
  price: 0,
  comment: "",
  outcomeSum: undefined,
  search: undefined,
};

export const outcome = createSlice({
  name: "outcome",
  initialState,
  reducers: {
    setList: (state, action) => {
      state.list = action.payload;
    },
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    setPrice: (state, action) => {
      state.price = action.payload;
    },
    setComment: (state, action) => {
      state.comment = action.payload;
    },
    setOutcomeSum: (state, action) => {
      state.outcomeSum = action.payload;
    },
    setOutcomeSearch: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const {
  setList,
  setTitle,
  setPrice,
  setComment,
  setOutcomeSum,
  setOutcomeSearch,
} = outcome.actions;
export default outcome.reducer;
