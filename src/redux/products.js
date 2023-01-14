import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: undefined,
  salons: undefined,
  filter: "all",
  search: "",
  cart: [],
};

export const products = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProductsList: (state, action) => {
      state.list = action.payload;
    },
    setSalons: (state, action) => {
      state.salons = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setCart: (state, action) => {
      state.cart.push(action.payload);
    },
    removeItem: (state, action) => {
      const item = state.cart.find((item) => item.title === action.payload);
      const index = state.cart.indexOf(item);
      if (index > -1) {
        // only splice array when item is found
        state.cart.splice(index, 1); // 2nd parameter means remove one item only
      }
    },
    Decriment: (state, action) => {
      const item = state.cart.find((prdct) => prdct.title === action.payload);
      if (item.qnt > 1) {
        state = state.cart?.map((items) =>
          items.title === action.payload
            ? {
                ...items,
                qnt: (items.qnt -= 1),
              }
            : items
        );
      } else {
        state = state.cart?.map((items) =>
          items.title === action.payload
            ? {
                ...items,
              }
            : items
        );
      }
    },
    Increment: (state, action) => {
      const item = state.cart.find((prdct) => prdct.title === action.payload);
      if (item) {
        state = state.cart?.map((items) =>
          items.title === action.payload
            ? {
                ...items,
                qnt: (items.qnt += 1),
              }
            : items
        );
      } else {
        return false;
      }
    },
    ClearCart: (state, action) => {
      state.cart = [];
    },
  },
});

export const {
  setProductsList,
  setSalons,
  setFilter,
  setSearch,
  setCart,
  removeItem,
  Increment,
  Decriment,
  ClearCart,
} = products.actions;
export default products.reducer;
