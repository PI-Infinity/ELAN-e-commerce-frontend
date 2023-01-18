import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  menu: "-20vw",
  cart: "-40vw",
  language: "geo",
  user: "",
  rerender: 0,
  artists: [],
};

export const main = createSlice({
  name: "main",
  initialState,
  reducers: {
    setOpenMenu: (state, action) => {
      state.menu = action.payload;
    },
    setOpenCart: (state, action) => {
      state.cart = action.payload;
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setArtists: (state, action) => {
      state.artists = action.payload;
    },
    setRerender: (state, action) => {
      state.rerender++;
    },
  },
});

export const {
  setOpenMenu,
  setOpenCart,
  setLanguage,
  setUser,
  setArtists,
  setRerender,
} = main.actions;
export default main.reducer;
